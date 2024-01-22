import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProcessDataService } from '../../../common/adapters';
import { ConfigPlanner_et } from '../entities';
import { FunnelLibraryService } from '../../funnel-library/services/funnel-library.service';
import { TransactionsService, _LoggerService } from '../../../common/services';

import * as uuid from 'uuid';
import * as _ from "lodash";

import { _response_I } from '../../../common/interfaces';
import { AuthPayload_I } from '../../auth/interfaces';
import { CreatePlannerDto } from '../dto/create-planner.dto';

@Injectable()

export class PlannerService {

    constructor(

        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        private readonly _LoggerService: _LoggerService,
        private readonly dataSource: DataSource,

        private readonly _funnelLibraryService: FunnelLibraryService,

        private readonly _processData: ProcessDataService,

        private readonly _TransactionsService: TransactionsService

    ) {

    }

    // TODO refactorizar para el uso de DTo
    async create_configsPlanner(createPlannerDto: CreatePlannerDto, user: AuthPayload_I): Promise<_response_I<ConfigPlanner_et>> {

        let _Response: _response_I<ConfigPlanner_et>;

        let queryRunner = await this._TransactionsService.startTransaction();

        const data_planner: ConfigPlanner_et = {
            ...createPlannerDto[0],
        }

        try {

            const configPlanner: ConfigPlanner_et = this._ConfigPlanner_et_repository.create({
                _id: data_planner._id || uuid.v4(),
                dash: null,
                toolsSettingsConfig: data_planner.toolsSettingsConfig || null,
                archives_id: data_planner.archives_id || null,
                __v: 0
            })

            console.log('configPlanner', configPlanner);

            const resp = await this._processData.process_create<ConfigPlanner_et>({
                body: configPlanner,
                entity: ConfigPlanner_et,
                queryRunner: queryRunner,
            });

            _Response = resp;

        } catch (error) {

            _Response = error;
            this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    // async create_configsPlanner(createPlannerDto: any, user: AuthPayload_I) {

    //     let _Response: _response_I<any>;

        // TODO Refactor by new structure

        // TODO Refactorizar a futuro la posibilidad de que sean más de un library funnel por usuario

        // const funnelLibrary: FunnelLibrary_et = await this._funnelLibraryService.findOne_byUser(user).then(resp => {
        //     return resp.data;
        // });

        // if (!funnelLibrary || funnelLibrary === null) {

        //     _Response = {
        //         ok: false,
        //         data: null,
        //         statusCode: 404,
        //         message: [
        //             {
        //                 text: 'No se encontró un funnel library asociado a este usuario',
        //                 type: 'global'
        //             }
        //         ]
        //     }

        //     this._LoggerService.warn({
        //         // message: `No se encontró una carpeta de embudos asociado a este Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} -`,
        //         message: `Usuario ${user.email} - No tiene una carpeta de embudos asociado`,
        //         response: {
        //             user: {
        //                 ...user
        //             }
        //         },
        //         context: 'Rel_Planner_Funnels_Library_Users_Service - create_configsPlanner',
        //     })

        //     throw new HttpException(_Response, _Response.statusCode);

        // }

        // const config_step_id: string = _.get(funnelLibrary, 'config_step_id._id', uuid.v4());

        // const configPlanner: ConfigPlanner_et = await this._ConfigPlanner_et_repository.create({
        //     _id: config_step_id,
        //     dash: null,
        //     toolsSettingsConfig: createPlannerDto.toolsSettingsConfig,
        //     funnelLibrary_id: funnelLibrary,
        // })

        // funnelLibrary.config_step_id = configPlanner;

        // const queryRunner = this.dataSource.createQueryRunner();

        // await queryRunner.connect();

        // await queryRunner.startTransaction();

        // try {

        //     await queryRunner.manager.save(ConfigPlanner_et, configPlanner);

        //     // await queryRunner.manager.save(FunnelBody_et, funnels);
        //     await queryRunner.manager.save(FunnelLibrary_et, funnelLibrary);

        //     /* TODO
        //         Mostrar más detalles de la información que se guarda en el configurador
        //      */
        //     this._LoggerService.log({
        //         // message: `El Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - guardó el configurador: _id: "${configPlanner._id}" y se asoció a la carpeta de embudos: _id: "${funnelLibrary._id}"`,
        //         message: `Usuario ${user.email} - Guardó configuraciones de herramientas de su carpeta de embudos`,
        //         response: {
        //             user: {
        //                 ...user
        //             },
        //             body: {
        //                 configuraciones: {
        //                     ..._.pick(configPlanner, ['_id', 'toolsSettingsConfig'])
        //                 },
        //                 carpeta: {
        //                     ..._.pick(funnelLibrary, ['_id', 'name'])
        //                 }
        //             }
        //         },
        //         context: 'Rel_Planner_Funnels_Library_Users_Service - create_configsPlanner',
        //     })

        //     await queryRunner.commitTransaction();
        //     await queryRunner.release();


        // } catch (error) {

        //     console.log('error', error);
        //     await queryRunner.rollbackTransaction();
        //     await queryRunner.release();

        //     this._LoggerService.error({
        //         // message: `Error: ${error}`,
        //         message: `Usuario ${user.email} - Error al guardar configuraciones de herramientas de su carpeta de embudos`,
        //         response: {
        //             user: {
        //                 ...user
        //             },
        //             body: {
        //                 error: error
        //             }
        //         },
        //         context: 'Rel_Planner_Funnels_Library_Users_Service - create_configsPlanner',
        //     })

        // }

    //     return _Response;

    // }



}
