import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProcessDataService } from "../../../common/adapters";
import { _argsFind, _response_I } from "../../../common/interfaces";
import { AuthPayload_I } from "../../auth/interfaces";

import { ConfigPlanner_et } from "../entities";
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { FunnelLibraryService } from "../../funnel-library/services/funnel-library.service";

import { LoggModel, _LoggerService } from '../../../common/services/_logger.service';

import * as uuid from 'uuid';
import * as _ from "lodash";



@Injectable()
export class Rel_Planner_Funnels_Library_Users_Service {


    constructor(
        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,


        private readonly _LoggerService: _LoggerService,
          private readonly dataSource: DataSource,


        private readonly _funnelLibraryService: FunnelLibraryService,


        private readonly _processData: ProcessDataService,
    ) {

    }



    async create(createPlannerDto: any, user: AuthPayload_I) {

        let _Response: _response_I<any>;

        // TODO
        // Refactorizar a futuro la posibilidad de que sean más de un library funnel por usuario
        const funnelLibrary: FunnelLibrary_et = await this._funnelLibraryService.findOne_byUser(user).then(resp => {
            return resp.data;
        });

        if ( !funnelLibrary || funnelLibrary === null) {

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
                context: 'Rel_Planner_Funnels_Library_Users_Service - create',
            })

            throw new HttpException(_Response, _Response.statusCode);

        }

        const config_step_id: string =  _.get(funnelLibrary, 'config_step_id._id', uuid.v4());

        const configPlanner: ConfigPlanner_et = await this._ConfigPlanner_et_repository.create({
            _id: config_step_id,
            dash: null,
            toolsSettingsConfig: createPlannerDto.toolsSettingsConfig,
            funnelLibrary_id: funnelLibrary
        })

        funnelLibrary.config_step_id = configPlanner;

          const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {

            await queryRunner.manager.save(ConfigPlanner_et, configPlanner);

            // await queryRunner.manager.save(FunnelBody_et, funnels);
            await queryRunner.manager.save(FunnelLibrary_et, funnelLibrary);

            /* TODO
                Mostrar más detalles de la información que se guarda en el configurador
             */
            this._LoggerService.log({
                message: `El usuario ${user.email} guardó el configurador:
                _id: ${configPlanner._id} y se asoció a la carpeta de embudos:
                _id: ${funnelLibrary._id}`,
            })

            await queryRunner.commitTransaction();
            await queryRunner.release();


        } catch (error) {

            console.log('error', error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

             this._LoggerService.error({
                message: `Error: ${error}`,
                context: 'Rel_Funnels_Planner_Library_Users_Service - create_funnels',
            })

        }

       /*
       await this._processData.process_create<ConfigPlanner_et>(this._ConfigPlanner_et_repository, configPlanner).then(() => {

        }, err => {

            _Response = err;
            _Response.message = [
                {
                    text: 'Error al crear el configurador del embudo',
                    type: 'global'
                }
            ]
            throw new HttpException(_Response, _Response.statusCode);

        })

        await this._processData.process_create<FunnelLibrary_et>(this._FunnelLibrary_et_repository, funnelLibrary).then(response => {

            _Response = response;

        }, err => {

            _Response = err;
            _Response.message = [
                {
                    text: 'Error al actualizar el funnel library',
                    type: 'global'
                }
            ]
            throw new HttpException(_Response, _Response.statusCode);

        })
         */


        return _Response;

    }



}