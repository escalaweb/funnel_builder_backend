import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";
import { _argsFind, _response_I } from "../../../common/interfaces";
import { AuthPayload_I } from "../../auth/interfaces";

import { FunnelBody_et } from "../../funnels/entities";
import { User_et } from "../../users/entities";
import { UsersService } from "../../users/services/users.service";
import { ConfigPlanner_et } from "../entities";
import { FunnelsService } from "../../funnels/services/funnels.service";
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { FunnelLibraryService } from "../../funnel-library/services/funnel-library.service";


import * as uuid from 'uuid';
import * as _ from "lodash";



@Injectable()
export class Rel_Planner_Funnels_Library_Users_Service {


    constructor(
        @InjectRepository(FunnelBody_et)
        private readonly _FunnelBody_et_repository: Repository<FunnelBody_et>,

        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,



        @InjectRepository(User_et)
        private readonly _Users_et_repository: Repository<User_et>,


        private readonly _usersService: UsersService,
        private readonly _funnelService: FunnelsService,
        private readonly _funnelLibraryService: FunnelLibraryService,


        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,
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

        await this._processData.process_create<ConfigPlanner_et>(this._ConfigPlanner_et_repository, configPlanner).then(response => {

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


        return _Response;

    }



}