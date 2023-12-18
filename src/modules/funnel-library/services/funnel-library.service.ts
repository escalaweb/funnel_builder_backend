import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";

import { FunnelLibrary_et } from "../entities";
import { _argsFind, _argsPagination, _response_I } from "../../../common/interfaces";
import { CreateFunnelLibraryDto } from "../dto";
import { AuthPayload_I } from "../../auth/interfaces/_jwt-payload.interface";
import { ConfigPlanner_et } from "../../planner/entities";

import * as uuid from 'uuid';
import * as _ from "lodash";
import { LibraryPermisions_et } from "../../library-permisions/entities";
import { TransactionsService } from "../../../database/services/transactions.service";

@Injectable()
export class FunnelLibraryService {

    constructor(

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        @InjectRepository(LibraryPermisions_et)
        private readonly _LibraryPermisions_et_repository: Repository<LibraryPermisions_et>,

        private readonly _processData: ProcessDataService,
        private readonly _TransactionsService: TransactionsService,
        private readonly _dateService: DateProcessService,

        private readonly dataSource: DataSource,


    ) {

    }

    async create(CreateFunnelLibraryDto: CreateFunnelLibraryDto, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            let data_funnelLibraryPermisions: LibraryPermisions_et = this._LibraryPermisions_et_repository.create({
                elementsEffect: 'all',
                permisionType: 0,
                user_id: user,
            });

            let data_funnelLibrary: FunnelLibrary_et = this._FunnelLibrary_et_repository.create( {
                ...CreateFunnelLibraryDto,
                __v: 0,
                user_id: user,

            });

            let data_configStep: ConfigPlanner_et = this._ConfigPlanner_et_repository.create( {
                __v: 0,
                dash: null,
                toolsSettingsConfig: [],
            });

            let created_config = await this._processData.process_create<ConfigPlanner_et>({
                body: data_configStep,
                entity: ConfigPlanner_et,
                queryRunner: queryRunner,
            }).then( ({ data })=> data );

            let created_FunnelLibrary = await this._processData.process_create<FunnelLibrary_et>({
                body: {
                    ...data_funnelLibrary,
                    config_step_id: created_config,
                    // _id: '3424934',
                },
                entity: FunnelLibrary_et,
                queryRunner: queryRunner,
            }).then( ({ data })=> data );

            await this._processData.process_create<ConfigPlanner_et>({
                body: {
                   ...created_config,
                    funnelLibrary_id: {
                        ...created_FunnelLibrary,
                        config_step_id: null
                    }
                },
                entity: ConfigPlanner_et,
                queryRunner: queryRunner,
            }).then( ({ data })=> data );

            await this._processData.process_create<LibraryPermisions_et>({
                body: {
                   ...data_funnelLibraryPermisions,
                   funnelLibrary_id: created_FunnelLibrary,
                    // _id: '3424934',
                },
                entity: LibraryPermisions_et,
                queryRunner: queryRunner,
            }).then( ({ data })=> data );

         /*
            let created_config = await queryRunner.manager.save(ConfigPlanner_et, data_configStep);

            let created_FunnelLibrary = await queryRunner.manager.save( FunnelLibrary_et,
                {
                    ...data_funnelLibrary,
                    config_step_id: created_config,
                }
            );

            await queryRunner.manager.save(ConfigPlanner_et, {
                ...created_config,
                funnelLibrary_id: {
                    ...created_FunnelLibrary,
                    config_step_id: null
                }
            });

            data_funnelLibraryPermisions.funnelLibrary_id = created_FunnelLibrary;

            await queryRunner.manager.save(LibraryPermisions_et, {
                ...data_funnelLibraryPermisions,
            });

            const librarySaved = await queryRunner.manager.findOne(FunnelLibrary_et, {
                    where: {
                        _id: created_FunnelLibrary._id
                    },
                    relations: [
                        'user_id',
                        'config_step_id',
                        'funnels_id',
                        'funnel_library_permision_id',
                    ],
                    select: {
                    user_id: {
                        _id: true,
                        name: true,
                        email: true
                    },

                }
            });
            */

            _Response = {
                statusCode: 200,
                ok: true,
                message: [
                    {
                        text: 'Carpeta de embudo creada',
                        type: 'global'
                    }
                ],
                // data: librarySaved,
            }

            this._TransactionsService.commitTransaction(queryRunner);


        } catch (err) {

            _Response = err;

            this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    async find(page: number = 1, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et[]>> {

        let _Response: _response_I<FunnelLibrary_et[]>;

        const args: _argsPagination = {
            findObject: {
                where: {
                    "user_id._id": user._id
                },
                relations: [
                    'user_id',
                    'funnels_id',
                    'config_step_id',
                    'funnels_id.stages',
                    'funnels_id.customizeProcess_step_id'
                    // 'funnel_library_permision_id'
                ],
                select: {
                    user_id: {
                        _id: true,
                        name: true,
                        email: true
                    }

                },
            },
            options: {
                page: page,
                limit: 12,
                // limit: this._configP._get(_Configuration_Keys.DEFAULT_LIMIT),
                route: '/',
            },
        }

        await this._processData.process_getAll_paginate<FunnelLibrary_et>(this._FunnelLibrary_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);

        }, (err) => {

            _Response = err;
            throw new HttpException(_Response, _Response.statusCode);

        });

        return _Response;

    }

    async findAll(page: number = 1, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et[]>> {

        let _Response: _response_I<FunnelLibrary_et[]>;

        const args: _argsPagination = {
            findObject: {
                where: {
                    "user_id._id": user._id
                },
                relations: [
                    'user_id',
                    'funnels_id',
                    'config_step_id',
                    'funnels_id.stages',
                    'funnels_id.customizeProcess_step_id',
                    'funnel_library_permision_id'
                ],
                select: {
                    user_id: {
                        _id: true,
                        name: true,
                        email: true
                    }

                },
            },
            options: {
                page: page,
                limit: 12,
                // limit: this._configP._get(_Configuration_Keys.DEFAULT_LIMIT),
                route: '/',
            },
        }

        await this._processData.process_getAll_paginate<FunnelLibrary_et>(this._FunnelLibrary_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);

        }, (err) => {

            _Response = err;
            throw new HttpException(_Response, _Response.statusCode);

        });

        return _Response;

    }



    async findOne(_id: string, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        let args: _argsFind = {
            findObject: {
                where: {
                    _id: _id,
                    "user_id._id": user._id
                },
                relations: ['user_id', 'funnels_id', 'funnels_id.stages', 'funnels_id.config_step_id'],
                select: {
                    user_id: {
                        _id: true,
                        name: true,
                        email: true
                    },

                }

            },
        }

        await this._processData.process_getOne<FunnelLibrary_et>(this._FunnelLibrary_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);
            // let aux_resp = structuredClone(resp);

            if (resp.statusCode === 200) {
                _Response.message = [
                    {
                        text: 'Carpeta de embudo obtenida',
                        type: 'global'
                    }
                ]
            }

        }, (err) => {

            _Response = err;
            throw new HttpException(_Response, _Response.statusCode);

        });

        return _Response;

    }

    async findOne_byUser(user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        let args: _argsFind = {
            findObject: {
                where: {
                    "user_id._id": user._id
                },
                relations: ['user_id', 'config_step_id', 'funnels_id', 'funnels_id.stages', 'funnels_id'],
                select: {
                    user_id: {
                        _id: true,
                        name: true,
                        email: true
                    },
                }
            },
        }

        await this._processData.process_getOne<FunnelLibrary_et>(this._FunnelLibrary_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);
            // let aux_resp = structuredClone(resp);

            if (resp.statusCode === 200) {
                _Response.message = [
                    {
                        text: 'Carpeta de embudo obtenida',
                        type: 'global'
                    }
                ]
            }

        }, (err) => {

            _Response = err;
            throw new HttpException(_Response, _Response.statusCode);

        });

        return _Response;

    }

}
