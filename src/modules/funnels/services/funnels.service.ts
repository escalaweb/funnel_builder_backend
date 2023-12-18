import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";
import { FunnelBody_et, FunnelBody_stages_et } from "../entities";
import { _argsFind, _response_I } from "../../../common/interfaces";
import { FunnelLibraryService } from "../../funnel-library/services/funnel-library.service";
import { AuthPayload_I } from "../../auth/interfaces";
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { UsersService } from "../../users/services/users.service";
import { CustomizeProcess_et } from "../../customize-process/entities";
import { ConfigPlanner_et } from "../../planner/entities";
import { User_et } from "../../users/entities";
import { _LoggerService, LoggModel } from "../../../common/services";

import * as uuid from 'uuid';
import * as _ from "lodash";


@Injectable()
export class FunnelsService {

    constructor(
        @InjectRepository(FunnelBody_et)
        private readonly _FunnelBody_et_repository: Repository<FunnelBody_et>,

        @InjectRepository(FunnelBody_stages_et)
        private readonly _FunnelBody_stages_et_repository: Repository<FunnelBody_stages_et>,

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        @InjectRepository(CustomizeProcess_et)
        private readonly _CustomizeProcess_et_repository: Repository<CustomizeProcess_et>,

        private readonly _FunnelLibraryService: FunnelLibraryService,
        private readonly _usersService: UsersService,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

        private readonly dataSource: DataSource,

        private readonly _LoggerService: _LoggerService,

    ) {

    }

    async update(_id: string, data: any, user: AuthPayload_I): Promise<_response_I<FunnelBody_et>> {

        let _Response: _response_I<FunnelBody_et>;

        await this._processData.process_update<FunnelBody_et>(this._FunnelBody_et_repository, _id, data).then(response => {

            _Response = response;

            _Response.message = [
                {
                    text: 'Datos de usuario guardados',
                    type: 'global'
                }
            ]

        }, err => {
            _Response = err;
            console.log('err', err);
            throw new HttpException(_Response, _Response.statusCode);
        })

        return _Response;

    }

    async findAll(user: AuthPayload_I): Promise<_response_I<FunnelBody_et[]>> {

        let _Response: _response_I<FunnelBody_et[]>;

        let args: _argsFind = {
            findObject: {
                where: {
                },
                relations: ['funnelLibrary_id', 'stages'],
                select: {

                }

            },

        }

        await this._processData.process_getAll<FunnelBody_et>(this._FunnelBody_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);

        }, (err) => {
            _Response = err;

            throw new HttpException(_Response, _Response.statusCode);
        });

        return _Response;

    }

    async findOne(_id: string, user: AuthPayload_I): Promise<_response_I<FunnelBody_et>> {

        let _Response: _response_I<FunnelBody_et>;

        let args: _argsFind = {
            findObject: {
                where: {
                    _id: _id,
                },
                relations: ['stages'],
                select: {
                }

            },
        }

        await this._processData.process_getOne<FunnelBody_et>(this._FunnelBody_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);

        }, (err) => {

            let _Response: _response_I<any> = {
                ok: false,
                statusCode: 404,
                data: null,
                err: err,
                message: [
                    {
                        text: 'El id o termino especificado, no es válido',
                        type: 'global'
                    }
                ]
            }

            throw new HttpException(_Response, _Response.statusCode);

        });

        return _Response;

    }



    async create_funnels(data: any[], user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        let LoggerModels: LoggModel[] = [];

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

        let funnels_deleteEty: FunnelBody_et[] = [];

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {

            if (funnelLibrary_id === null) {

                funnelLibrary_id = await this._FunnelLibrary_et_repository.create({
                    _id: uuid.v4(),
                    name: 'Carpeta de embudo',
                    user_id: User_data,
                    funnels_id: [],
                })

                LoggerModels.push({
                    type: 'log',
                    // message: `Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - ha creado una carpeta de embudos`,
                    message: `Usuario ${user.email} - ha creado una carpeta de embudos`,
                    response: {
                        user: {
                            ...user
                        },
                        body: {
                            carpeta: {
                                ..._.pick(funnelLibrary_id, ['_id', 'name'])
                            }
                        }
                    },
                    context: 'FunnelsService - create_funnels'
                });

            } else {

                // Se eliminan los funnels que no vienen en el guardado
                const aux_funnelLibrary_id = funnelLibrary_id._id;
                const funnels_ids: string[] = data.map((funnel: FunnelBody_et) => funnel._id);

                funnels_deleteEty = await this._FunnelBody_et_repository
                    .createQueryBuilder('funnels')
                    .where('funnels.funnelLibrary_id = :aux_funnelLibrary_id', { aux_funnelLibrary_id })
                    .andWhere('funnels._id NOT IN (:...funnelIds)', { funnelIds: funnels_ids })
                    .select('funnels')
                    .getMany();


                await queryRunner.manager.delete(FunnelBody_et, funnels_deleteEty).then((resp) => {

                    if (funnels_deleteEty.length > 0) {

                        let funnelsString: any[] = funnels_deleteEty.map((funnel: FunnelBody_et) => {
                            return {
                                _id: funnel._id,
                                Embudo: funnel.name
                            }
                        });

                        LoggerModels.push({
                            type: 'log',
                            context: 'FunnelsService - create_funnels',
                            message: `Usuario ${user.email} - ha eliminado los embudos que no vienen en el guardado`,
                            response: {
                                user: {
                                    ...user
                                },
                                body: {
                                    embudos: [...funnelsString]
                                }
                            }
                        });

                    }

                }).catch(err => {
                });

                const deleteStages_ids = await this._FunnelBody_stages_et_repository
                    .createQueryBuilder('stages_funnel')
                    .where('stages_funnel.funnel_id IN (:...funnelIds)', { funnelIds: funnels_ids })
                    .select('stages_funnel._id')
                    .getMany();

                await queryRunner.manager.delete(FunnelBody_stages_et, deleteStages_ids).then(resp => {

                }).catch(err => {

                });
            }

            let stages: FunnelBody_stages_et[] = [];

            for (const [i, item] of data.entries()) {

                for (const [_i, _item] of item.stages.entries()) {

                    let aux: FunnelBody_stages_et = this._FunnelBody_stages_et_repository.create({
                        ..._item as FunnelBody_stages_et,
                        _id: _.get(_item, '_id', uuid.v4()),
                        funnel_id: item,
                        __v: 1,
                    });

                    stages.push(aux)

                }

            }

            const aux_funnelLibrary_id = funnelLibrary_id._id;
            const aux_funnels_Ety = await this._FunnelBody_et_repository
                .createQueryBuilder('funnels')
                .where('funnels.funnelLibrary_id = :aux_funnelLibrary_id', { aux_funnelLibrary_id })
                .select('funnels')
                .getMany();

            let funnels: FunnelBody_et[] = data.map((funnel: FunnelBody_et) => {

                if (aux_funnels_Ety.some(item => item._id === funnel._id)) {

                    /*
                    LoggerModels.push({
                         type: 'log',
                         message: `Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - ha re escrito un embudo:
                        _id: "${funnel._id}" Embudo: "${funnel.name}"`,
                         context: 'FunnelsService - create_funnels'
                     });
                 */

                } else {

                    LoggerModels.push({
                        type: 'log',
                        // message: `Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - ha creado un embudo: _id: "${funnel._id}" Embudo: "${funnel.name}"`,
                        message: `Usuario ${user.email} - ha creado un embudo`,
                        response: {
                            user: {
                                ...user
                            },
                            body: {
                                ..._.pick(funnel, ['_id', 'name'])
                            }
                        },
                        context: 'FunnelsService - create_funnels'
                    });

                }

                return this._FunnelBody_et_repository.create({
                    ...funnel,
                    __v: 1,
                    _id: _.get(funnel, '_id', uuid.v4()),
                    customizeProcess_step_id: funnel.customizeProcess_step_id || null,
                    funnelLibrary_id: funnelLibrary_id,
                    updatedAt: this._dateService.setDate(),
                });

            });

            funnelLibrary_id.funnels_id = [...funnels];
            funnelLibrary_id.updatedAt = this._dateService.setDate();

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

            this._LoggerService._emitLoggers(LoggerModels);

        } catch (error) {

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


            this._LoggerService._emitLoggers(LoggerModels);
            this._LoggerService.error({
                // message: `Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - ha tenido un error al guardar un embudo - Error: ${error}`,
                message: `Usuario ${user.email} - ha tenido un error al guardar un embudo`,
                response: {
                    user: {
                        ...user
                    },
                    body: {
                        error: error
                    }
                },
                context: 'FunnelsService - create_funnels',
            });


        }

        return _Response;

    }


    async set_customizeProcess_step_id(funnel: FunnelBody_et): Promise<CustomizeProcess_et> {

        if (!funnel.customizeProcess_step_id || funnel.customizeProcess_step_id === null) {

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

        this._LoggerService.log({
            message: `El Usuario ${user.email} - Ha solicitado su información de funnel builder inicial `,
            response: {
                user: {
                    ...user
                }
            },
            context: 'FunnelsService - get_funnels',
        });

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

                    _Response = {
                        ok: true,
                        statusCode: 200,
                        data: {
                            funnels: aux_funnels,
                            config_step: config_step
                        }
                    }

                    this._LoggerService.debug({
                        // message: `El Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - Ha obtenido su información de funnel builder inicial `,
                        message: `El Usuario ${user.email} - Ha obtenido su información de funnel builder inicial `,
                        response: {
                            user: {
                                ...user
                            },
                            body: {
                                data: _Response.data
                            }
                        },
                        context: 'FunnelsService - get_funnels',
                    });

                } else {

                    _Response = {
                        ok: true,
                        statusCode: 200,
                        data: {
                            funnels: [],
                            config_step: null
                        }
                    }

                    this._LoggerService.log({
                        // message: `El Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - No tiene información de embudos inicial `,
                        message: `El Usuario ${user.email} - No tiene información de embudos inicial `,
                        response: {
                            user: {
                                ...user
                            },
                            body: {
                                data: null
                            }
                        },
                        context: 'FunnelsService - get_funnels',
                    });

                }

            } else {

                _Response = { ...aux_Response }
                _Response.data = {
                    funnels: [],
                    config_step: null
                };

                this._LoggerService.log({
                    // message: `El Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - No tiene información de embudos inicial `,
                    message: `El Usuario ${user.email} - No tiene información de embudos inicial `,
                    response: {
                        user: {
                            ...user
                        },
                        body: {
                            data: null
                        }
                    },
                    context: 'FunnelsService - get_funnels',
                });
            }


        });

        return _Response;

    }

    async adrm_get_initial_funnel_byEmail(email: string): Promise<_response_I<FunnelBody_et[]>> {

        let _Response: _response_I<FunnelBody_et[]>;

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

        await this.get_initial_funnel(user).then(resp => {
            _Response = resp;
        })



        return _Response;

    }





}
