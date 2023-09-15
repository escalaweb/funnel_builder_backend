import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, DeepPartial, FindOneOptions, IsNull, Not, Repository } from "typeorm";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";
import { _argsFind, _response_I } from "../../../common/interfaces";
import { AuthPayload_I } from "../../auth/interfaces";
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { FunnelLibraryService } from "../../funnel-library/services/funnel-library.service";
import { FunnelBody_et, FunnelBody_stages_et } from "../entities";
import { User_et } from "../../users/entities";
import { UsersService } from "../../users/services/users.service";
import { CustomizeProcess_et } from "../../customize-process/entities";

import * as uuid from 'uuid';
import * as _ from "lodash";
import { ConfigPlanner_et } from "../../planner/entities";

@Injectable()
export class Rel_Funnels_Planner_Library_Users_Service {

    constructor(
        @InjectRepository(FunnelBody_et)
        private readonly _FunnelBody_et_repository: Repository<FunnelBody_et>,

        @InjectRepository(FunnelBody_stages_et)
        private readonly _FunnelBody_stages_et_repository: Repository<FunnelBody_stages_et>,

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        @InjectRepository(User_et)
        private readonly _Users_et_repository: Repository<User_et>,

        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        @InjectRepository(CustomizeProcess_et)
        private readonly _CustomizeProcess_et_repository: Repository<CustomizeProcess_et>,

        private readonly _FunnelLibraryService: FunnelLibraryService,
        private readonly _usersService: UsersService,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

        private readonly dataSource: DataSource
    ) {

    }


    async create_funnels(data: any[], user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;
        // let _Response: _response_I<any>;

        let funnelLibrary_id: FunnelLibrary_et;

        // console.log('entra aqui');
        const args: _argsFind<User_et> = {
            findObject: {
                where: {
                    _id: user._id,
                }
            }
        }
        const User_data: User_et = await this._usersService.findOne(args).then(resp => {
            return resp.data;
        })

        funnelLibrary_id = (await this._FunnelLibraryService.findAll(1, user).then()).data[0] || null;


        if (funnelLibrary_id === null) {

            funnelLibrary_id = await this._FunnelLibrary_et_repository.create({
                _id: uuid.v4(),
                name: 'Carpeta de embudo',
                user_id: User_data,
                funnels_id: [],

            })

        } else {

            // Se eliminan los funnels que no vienen en el guardado
            const aux_funnelLibrary_id = funnelLibrary_id._id;
            const funnels_ids: string[] = data.map((funnel: FunnelBody_et) => funnel._id);

            const deleteEntityIds = await this._FunnelBody_et_repository
                .createQueryBuilder('funnels')
                .where('funnels.funnelLibrary_id = :aux_funnelLibrary_id', { aux_funnelLibrary_id })
                .andWhere('funnels._id NOT IN (:...funnelIds)', { funnelIds: funnels_ids })
                .select('funnels._id')
                .getMany();

            await this._FunnelBody_et_repository.remove(deleteEntityIds);

            const deleteStages_ids = await this._FunnelBody_stages_et_repository
                .createQueryBuilder('stages_funnel')
                .where('stages_funnel.funnel_id IN (:...funnelIds)', { funnelIds: funnels_ids })
                .select('stages_funnel._id')
                .getMany();

            await this._FunnelBody_stages_et_repository.remove(deleteStages_ids);

        }

        /*
         stages: funnel.stages.map(stage => {
                    return this._FunnelBody_stages_et_repository.create({
                        ...stage,
                        funnel_id: funnel,
                    })
                })
        */

        let stages: FunnelBody_stages_et[] = [];
        /*
         data.map((funnel: FunnelBody_et) => {
            return funnel.stages.map(stage => {
                return this._FunnelBody_stages_et_repository.create({
                    ...stage,
                    _id: _.get(stage, '_id', uuid.v4()),
                    funnel_id: funnel,
                });

            })

        })
        */

        for (const [i, item] of data.entries()) {

            for (const [_i, _item] of item.stages.entries()) {

                let aux: any = this._FunnelBody_stages_et_repository.create({
                    ..._item,
                    _id: _.get(_item, '_id', uuid.v4()),
                    funnel_id: item,
                });

                stages.push(aux)

            }

        }


        let funnels: FunnelBody_et[] = data.map((funnel: FunnelBody_et) => {

            return this._FunnelBody_et_repository.create({
                ...funnel,
                _id: _.get(funnel, '_id', uuid.v4()),
                // customizeProcess_step_id: funnel.customizeProcess_step_id,
                funnelLibrary_id: funnelLibrary_id,

            });
        });

        funnelLibrary_id.funnels_id = [...funnels];

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {

            await queryRunner.manager.save(FunnelLibrary_et, funnelLibrary_id);

            await queryRunner.manager.save(FunnelBody_stages_et, stages);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            _Response = {
                ok: true,
                statusCode: 201,
                data: {
                    funnelLibrary_id: funnelLibrary_id,
                    stages: stages
                } as any,
                message: [
                    {
                        text: 'Datos de embudos guardados',
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
                        text: 'Error al guardar datos de embudos',
                        type: 'global'
                    }
                ]
            }

        }

        // await this._processData.process_create<FunnelLibrary_et>(this._FunnelLibrary_et_repository, funnelLibrary_id).then(response => {

        //     _Response = response;

        //     _Response.message = [
        //         {
        //             text: 'Datos de embudos guardados',
        //             type: 'global'
        //         }
        //     ]

        // }, err => {
        //     _Response = err;
        //     _Response.message = [
        //         {
        //             text: 'Error al guardar datos de funnels',
        //             type: 'global'
        //         }
        //     ]
        //     // console.log('err', err);
        //     throw new HttpException(_Response, _Response.statusCode);
        // })

        return _Response;

    }


    async set_customizeProcess_step_id(funnel: FunnelBody_et): Promise<CustomizeProcess_et> {

        if (!funnel.customizeProcess_step_id || funnel.customizeProcess_step_id === null) {


            // const funnelId: DeepPartial<FunnelBody_et> = { _id: funnel._id }; // Crear objeto    DeepPartial<FunnelBody_et> con el ID del FunnelBody_et

            return this._CustomizeProcess_et_repository.create(
                {
                    name: 'Proceso comercial',
                    _id: uuid.v4(),
                    stages: [
                        {
                            type: 'customization_stage_title',
                            steps: [
                                {
                                    contain: {
                                        text: 'Nombre de etapa'
                                    }
                                }
                            ]
                        },
                        {
                            type: 'customization_criterion',
                            steps: [
                                {
                                    contain: {
                                        text: ''
                                    }
                                }
                            ]
                        }
                    ],
                    funnel_id: funnel
                }
            )


        } else {

            return funnel.customizeProcess_step_id

        }

    }


    async get_initial_funnel(user: AuthPayload_I): Promise<_response_I<FunnelBody_et[]>> {

        let _Response: _response_I<any>;

        await this._FunnelLibraryService.findAll(1, user).then(async (resp) => {

            let aux_Response: _response_I<FunnelLibrary_et[]> = structuredClone(resp);

            if (aux_Response.statusCode === 200) {

                if (aux_Response.data[0].funnels_id?.length > 0) {

                    // TODO
                    // establecer un interface o tipo de dato en funnel que soporte string y entity para config_step_id y replicar ese metodo en otros lugares
                    let aux_funnels: FunnelBody_et[] = structuredClone(aux_Response.data[0].funnels_id);

                    let config_step: ConfigPlanner_et = _.get(aux_Response.data[0], 'config_step_id', null);

                    if (config_step) {

                        delete config_step.funnelLibrary_id;
                    }

                    // for (const [i, item] of aux_funnels.entries()) {

                    //     delete item.funnelLibrary_id;
                    // }

                    _Response = {
                        ok: true,
                        statusCode: 200,
                        data: {
                            funnels: aux_funnels,
                            config_step: config_step
                        }
                    }

                } else {
                    // _Response.data = [];

                    _Response = {
                        ok: true,
                        statusCode: 200,
                        data: {
                            funnels: [],
                            config_step: null
                        }
                    }
                }

            } else {

                _Response = { ...aux_Response }
                _Response.data = {
                    funnels: [],
                    config_step: null
                };

            }

        });

        return _Response;

    }



}

