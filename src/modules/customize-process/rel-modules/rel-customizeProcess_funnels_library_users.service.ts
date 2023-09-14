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
import { _response_I } from "../../../common/interfaces";
import { AuthPayload_I } from "../../auth/interfaces";
import { ConfigPlanner_et } from "../../planner/entities";

import * as uuid from 'uuid';
import * as _ from "lodash";

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


        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

        private readonly dataSource: DataSource
    ) {

    }



    async create_customizeProcess(data: any, user: AuthPayload_I): Promise<_response_I<CustomizeProcess_et[]>> {

        let _Response: _response_I<CustomizeProcess_et[]>;

        let funnels: FunnelBody_et[] = [];
        let customizeProcess: CustomizeProcess_et[] = []

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

                return this._CustomizeProcess_et_repository.create({
                    ...customizeProcess,
                    _id: customizeProcess._id || uuid.v4(),
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
                        text: 'Algo ha salido mal intente más tarde',
                        type: 'global'
                    }
                ]
            }

        }

        return _Response;
    }





}