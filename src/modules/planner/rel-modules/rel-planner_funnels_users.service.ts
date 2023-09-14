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

        let funnels: FunnelBody_et[] = [];

        console.log('busca', user);

        // TODO
        // Refactorizar a futuro la posibilidad de que sean más de un library funnel por usuario
        const funnelLibrary: FunnelLibrary_et = await this._funnelLibraryService.findOne_byUser(user).then(resp => {
            return resp.data;
        });

        console.log('funnelLibrary', funnelLibrary);

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

        // console.log('funnelLibrary', funnelLibrary);

        const config_step_id: string = _.get(funnelLibrary, 'funnels_id[0].config_step_id._id', uuid.v4());

        const configPlanner: ConfigPlanner_et = await this._ConfigPlanner_et_repository.create({
            _id: config_step_id,
            dash: null,
            toolsSettingsConfig: createPlannerDto.toolsSettingsConfig
        })

        console.log('funnelLibrary.funnels_id', funnelLibrary);

        funnels = funnelLibrary.funnels_id.map(r => {
            return {
                ...r,
                config_step_id: configPlanner,
            };
        });

        await this._processData.process_create<ConfigPlanner_et>(this._ConfigPlanner_et_repository, configPlanner).then(response => {

        }, err => {

            _Response = err;
            throw new HttpException(_Response, _Response.statusCode);

        })

        await this._processData.process_create<FunnelBody_et>(this._FunnelBody_et_repository, funnels).then(response => {

            _Response = response;

            // _Response.message = [
            //     {
            //         text: 'Datos de usuario guardados',
            //         type: 'global'
            //     }
            // ]

        }, err => {

            _Response = err;
            throw new HttpException(_Response, _Response.statusCode);

        })

        // let args: _argsFind<ConfigPlanner_et> = {
        //     findObject: {
        //         where: {
        //             _id: item.config_step_id._id
        //         }
        //     }
        // }

        // await this._processData.process_delete(this._ConfigPlanner_et_repository, args).then(resp => {

        // })


        return _Response;

    }



}