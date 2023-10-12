import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { FunnelLibraryService } from "../../funnel-library/services/funnel-library.service";
import { FunnelBody_et } from "../../funnels/entities";
import { User_et } from "../../users/entities";
import { UsersService } from "../../users/services/users.service";
import { CustomizeProcess_et } from "../entities";
import { _argsFind, _response_I } from "../../../common/interfaces";
import { AuthPayload_I } from "../../auth/interfaces";
import { ConfigPlanner_et } from "../../planner/entities";

import * as uuid from 'uuid';
import * as _ from "lodash";
import { _LoggerService } from "../../../common/services";
import { LoggModel } from "../../../common/services/_logger.service";

@Injectable()
export class Rel_CustomizeProcess_Funnels_Library_Users_Service {

    constructor(
        @InjectRepository(FunnelBody_et)
        private readonly _FunnelBody_et_repository: Repository<FunnelBody_et>,

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        @InjectRepository(User_et)
        private readonly _Users_et_repository: Repository<User_et>,

        @InjectRepository(CustomizeProcess_et)
        private readonly _CustomizeProcess_et_repository: Repository<CustomizeProcess_et>,


        private readonly _FunnelLibraryService: FunnelLibraryService,
        private readonly _usersService: UsersService,

        private readonly _LoggerService: _LoggerService,
        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

        private readonly dataSource: DataSource
    ) {

    }

    async create_customizeProcess(data: any, user: AuthPayload_I): Promise<_response_I<CustomizeProcess_et[]>> {

        let _Response: _response_I<CustomizeProcess_et[]>;

        let funnels: FunnelBody_et[] = [];
        let customizeProcess: CustomizeProcess_et[] = [];

        let LoggerModels: LoggModel[] = []

        // TODO
        // Refactorizar a futuro la posibilidad de que sean más de un library funnel por usuario
        const funnelLibrary: FunnelLibrary_et = await this._FunnelLibraryService.findOne_byUser(user).then(resp => {
            return resp.data;
        });

        if (funnelLibrary.funnels_id === null || funnelLibrary.funnels_id?.length === 0) {

            _Response = {
                ok: false,
                data: null,
                statusCode: 404,
                message: [
                    {
                        text: 'No se encontró un funnel asociado a este usuario',
                        type: 'global'
                    }
                ]
            }

            this._LoggerService.warn({
                message: `No se encontró una carpeta de embudos asociado a este usuario ${user.email}`,
                context: 'Rel_CustomizeProcess_Funnels_Library_Users_Service - create_customizeProcess',
            })

            throw new HttpException(_Response, _Response.statusCode);

        }

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {

            const customizeProcessPromises = data.customizeModels.map(async (customizeProcess: any) => {

                const funnelId = customizeProcess.funnel_id;

                const funnel = await queryRunner.manager.findOne(FunnelBody_et, {
                    where: {
                        _id: funnelId
                    }
                });

                let cust_id: string = customizeProcess?._id || uuid.v4();

                LoggerModels.push({
                    type: 'log',
                    message: `Usuario ${user.email} ha creado proceso comercial:
                    _id: "${cust_id}" Nombre de proceso: "${customizeProcess.name}" para el embudo:
                    _id: "${funnel._id}" Embudo: "${funnel.name}"`,
                    context: 'Rel_CustomizeProcess_Funnels_Library_Users_Service - create_customizeProcess',
                })

                return this._CustomizeProcess_et_repository.create({
                    ...customizeProcess,
                    _id: cust_id,
                    funnel_id: funnel
                });

            });

            const customizeProcesses = await Promise.all(customizeProcessPromises); // Esperar a que todas las promesas se resuelvan

            await queryRunner.manager.save(CustomizeProcess_et, customizeProcesses); // Guardar las entidades

            for (const [i, item] of customizeProcesses.entries()) {

                const funnel = await queryRunner.manager.findOne(FunnelBody_et, {
                    where: {
                        _id: item.funnel_id._id
                    }
                });

                funnel.customizeProcess_step_id = item;
                await queryRunner.manager.save(FunnelBody_et, funnel);

            }

            await queryRunner.commitTransaction();
            await queryRunner.release();

            _Response = {
                ok: true,
                statusCode: 201,
                data: customizeProcesses,
                message: [
                    {
                        text: 'Datos de proceso comercial guardados',
                        type: 'global'
                    }
                ]
            }

            this._LoggerService._emitLoggers(LoggerModels);


        } catch (error) {

            console.log('error', error);

            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            _Response = {
                ok: false,
                statusCode: 400,
                data: null,
                err: error,
                message: [
                    {
                        text: 'Error al guardar el proceso comercial',
                        type: 'global'
                    }
                ]
            }

            this._LoggerService.error({
                message: `Usuario ${user.email} ha tenido un error al guardar proceso comercial para sus embudos`,
                context: 'Rel_CustomizeProcess_Funnels_Library_Users_Service - create_customizeProcess',
            })

            this._LoggerService.error({
                message: `Error: ${error}`,
                context: 'Rel_CustomizeProcess_Funnels_Library_Users_Service - create_customizeProcess',
            })

        }

        return _Response;
    }

    async adrm_get_initial_customize_byEmail(email: string): Promise<_response_I<CustomizeProcess_et[]>> {

        let _Response: _response_I<CustomizeProcess_et[]>;

        const args: _argsFind<User_et> = {
            findObject: {
                where: {
                    email: email,
                }
            }
        }
        const User_data: User_et = await this._usersService.findOne(args).then(resp => {
            return resp.data;
        });

        let user: AuthPayload_I = {
            _id: User_data._id,
            email: User_data.email,
            name: User_data.name,
            username_id: User_data.username_id,
            tenant_id: User_data.tenant_id,
        }

        let user_id: string = user._id;

        await this._FunnelLibrary_et_repository
            .createQueryBuilder('funnelLibrary')
            .innerJoinAndSelect('funnels', 'f', 'f.funnelLibrary_id = funnelLibrary._id')
            .innerJoinAndSelect('customize_process', 'cp', 'cp.funnel_id = f._id')
            .where('funnelLibrary.user_id = :user_id', { user_id })
            .select('cp.*')
            .getRawMany<CustomizeProcess_et>().then(resp => {

                _Response = {
                    statusCode: (resp.length === 0) ? 404 : 200,
                    ok: true,
                    message: [{
                        text: `Datos de proceso comercial del usuario ${email}`,
                        type: 'global'
                    }],
                    data: resp,
                }

            }, err => {

                _Response = {
                    data: [],
                    err: err,
                    message: [{
                        text: `Algo ha salido mal consultando datos de proceso comercial del usuario ${email}`,
                        type: 'global'
                    }],
                    ok: false,
                    statusCode: 500
                }

            });


        return _Response;

    }




}