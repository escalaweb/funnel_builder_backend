

import { _LoggerService } from "../../../common/services";
import { _relations_byFunnelLibrary } from "../constants";
import { ConfigPlanner_et } from "../../planner/entities";
import { CreateFunnelLibraryDto } from "../dto";
import { DataSource, Not, QueryRunner, Repository } from "typeorm";
import { FunnelBuilderService } from ".";
import { FunnelLibrary_et } from "../entities";
import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LibraryPermisions_et } from "../../library-permisions/entities";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";
import { TransactionsService } from "../../../common/services/transactions.service";
import * as _ from "lodash";

import { _argsFindMany_I, _argsFind_I, _argsPagination_I, _response_I } from "../../../common/interfaces";
import { AuthPayload_I } from "../../auth/interfaces/_jwt-payload.interface";
import { PlannerService } from "../../planner/services/planner.service";
import { FunnelArchivesService } from "../../funnel_archives/services/funnel_archives.service";
import { FunnelArchive_et } from '../../funnel_archives/entities/funnel-archive.entity';

@Injectable()
export class FunnelLibraryService {

    constructor(

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        @InjectRepository(FunnelArchive_et)
        private readonly _FunnelArchive_et_repository: Repository<FunnelArchive_et>,

        @InjectRepository(LibraryPermisions_et)
        private readonly _LibraryPermisions_et_repository: Repository<LibraryPermisions_et>,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

        private readonly _funnelBuilderService: FunnelBuilderService,
        private readonly _plannerService: PlannerService,
        private readonly _FunnelsArchivesService: FunnelArchivesService,

        private readonly _LoggerService: _LoggerService,
        private readonly _TransactionsService: TransactionsService,
        private readonly dataSource: DataSource,

    ) {

    }

    async save_single_folderState(funnelLibrary_id: string, archive_id: string, folderState: any, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        let aux_folderState: FunnelLibrary_et = folderState as FunnelLibrary_et;

        let queryRunner = await this._TransactionsService.startTransaction();

        try {

            // Se guardan embudos
            const funnels_resp = await this._funnelBuilderService.create_funnels_v2(funnelLibrary_id, archive_id, aux_folderState, user, queryRunner);

            this._TransactionsService.commitTransaction(queryRunner);

            _Response = {
                ...funnels_resp
            }

        } catch (error) {
            _Response = error;
            this._TransactionsService.rollbackTransaction(queryRunner);
        }

        return _Response;

    }

    async find_initialBy_library_sharedMe(funnelLibrary_id: string, archive_id: string, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        // TODO Refactor by new structure

        let queryRunner = await this._TransactionsService.startTransaction();

        try {
            // TODO mejorar la información que viene de este query
            const args: _argsFind_I = {
                findObject: {
                    where: {
                        "user_id._id": user._id,
                        "funnelLibrary_id._id": funnelLibrary_id,
                        "permisionType": Not(0)
                    },
                    relations: [
                        'user_id',
                        'funnelLibrary_id',
                        'funnelLibrary_id.archives_id.user_id',
                        'funnelLibrary_id.archives_id.funnels_id',
                        'funnelLibrary_id.archives_id.config_step_id',
                        'funnelLibrary_id.archives_id.funnels_id.stages',
                        'funnelLibrary_id.archives_id.funnels_id.customizeProcess_step_id',
                        'funnelLibrary_id.funnel_library_permision_id',
                        'funnelLibrary_id.funnel_library_permision_id.user_id'
                    ],
                },

            }

            const resp_permision: _response_I<LibraryPermisions_et> = await this._processData.process_getOne<LibraryPermisions_et>({
                argsFind: args,
                entity: LibraryPermisions_et,
                queryRunner: queryRunner
            }).then(r => {
                this._LoggerService.log({
                    message: `El Usuario ${user.email} - Ha solicitado su información de funnel builder inicial, de una carpeta compartida`,
                    response: {
                        user: {
                            ...user
                        },
                        body: {
                            data: {
                                funnelLibrary_id: funnelLibrary_id
                            }
                        }
                    },
                    context: 'FunnelLibraryService - initial_byLibrary_sharedMe',
                });
                return r;
            });

            if (!resp_permision.data) {

                _Response = {
                    ok: true,
                    statusCode: 404,
                    data: null,
                    message: [{ text: 'No se han permisos válidos', type: 'global' }]
                }

            } else {

                let resp: FunnelLibrary_et = { ...resp_permision.data.funnelLibrary_id };

                resp.funnel_library_permision_id = resp.funnel_library_permision_id.filter(permision => permision.user_id._id === user._id);

                // Reorganización por posición

                let aux_archive = resp.archives_id.find(archive => archive._id === archive_id) || null;

                if (aux_archive === null) {

                    this._LoggerService.log({
                        message: `El Usuario ${user.email} - No tiene archivos en la carpeta indicada`,
                        response: {
                            user: {
                                ...user
                            },
                            body: {
                                data: {
                                    funnelLibrary_id: funnelLibrary_id
                                }
                            }
                        },
                        context: 'FunnelLibraryService - initial_byLibrary_sharedMe',
                    });

                    throw new HttpException({
                        ok: false,
                        statusCode: 404,
                        message: [
                            {
                                text: 'No se ha encontrado el archivo indicado',
                                type: 'global'
                            }
                        ],
                        err: 'No se ha encontrado el archivo indicado'
                    }, 404)

                }

                resp.archives_id = [aux_archive];

                for (const [i, item] of resp.archives_id.entries()) {

                    if (item.funnels_id.length > 0) {
                        item.funnels_id = await item.funnels_id.sort((a, b) => a.pos - b.pos);
                        for (const [i, element] of item.funnels_id.entries()) {
                            element.stages = await element.stages.sort((a, b) => a.pos - b.pos);
                        }
                    }

                }

                // if (resp.funnels_id.length > 0) {

                //     resp.funnels_id = await resp.funnels_id.sort((a, b) => a.pos - b.pos);
                //     for (const [i, element] of resp.funnels_id.entries()) {
                //         element.stages = await element.stages.sort((a, b) => a.pos - b.pos);
                //     }
                // }

                _Response = {
                    ok: true,
                    statusCode: 200,
                    data: { ...resp }
                };

                this._LoggerService.debug({
                    message: `El Usuario ${user.email} - Ha obtenido su información de funnel builder inicial de un folder compartido `,
                    response: {
                        user: {
                            ...user
                        },
                        body: {
                            data: { ..._Response.data }
                        }
                    },
                    context: 'FunnelLibraryService - initial_byLibrary_sharedMe',
                });

            }

        } catch (error) {
            _Response = error;
            _Response.data = null
        }

        this._TransactionsService.commitTransaction(queryRunner);

        return _Response;
    }

    async find_initialBy_libraryId(funnelLibrary_id: string, archive_id: string, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        // TODO Refactor by new structure

        let where = {
            _id: funnelLibrary_id,
            user_id: {
                _id: user._id
                // _id: "8730e4df-7246-44bf-83a4-7fc44a620012"
            },
            funnel_library_permision_id: {
                user_id: {
                    _id: user._id
                    // _id: "8730e4df-7246-44bf-83a4-7fc44a620012"
                },
                permisionType: 0
            }
        }

        let args: _argsFind_I = {
            findObject: {
                where: {
                    ...where
                },
                relations: [
                    'user_id',
                    'archives_id',
                    'archives_id.config_step_id',
                    'archives_id.funnels_id',
                    'archives_id.funnels_id.stages',
                    'archives_id.funnels_id.customizeProcess_step_id',
                    'funnel_library_permision_id',
                    'funnel_library_permision_id.user_id'
                ],

            },
            populate: {
                user_id: {
                    select: [
                        "_id",
                        "name",
                        "email",
                    ]
                }
            }
        }

        let queryRunner = await this._TransactionsService.startTransaction();

        const resp_1: _response_I<FunnelLibrary_et> = await this._processData.process_getOne<FunnelLibrary_et>({
            argsFind: args,
            entity: FunnelLibrary_et,
            queryRunner: queryRunner
        }
        ).then(r => {
            return r;
        }).catch(r => r);


        try {

            if (resp_1.statusCode != 200) {

                const resp_2 = await this.find_initialBy_library_sharedMe(funnelLibrary_id, archive_id, user)

                if (resp_2.statusCode !== 200) throw new HttpException(resp_2, resp_2.statusCode);

                _Response = {
                    ...resp_2,
                    statusCode: 200
                }

            }

            // Si el folder es personal entonces:
            if (resp_1.statusCode === 200) {

                this._LoggerService.log({
                    message: `El Usuario ${user.email} - Ha solicitado su información de funnel builder inicial de una carpeta de su autoria `,
                    response: {
                        user: {
                            ...user
                        },
                        body: {
                            data: {
                                funnelLibrary_id: funnelLibrary_id
                            }
                        }
                    },
                    context: 'FunnelLibraryService - initial_byLibrary',
                });


                // Reorganización por posición
                let aux_archive = resp_1.data.archives_id.find(archive => archive._id === archive_id) || null;

                if (aux_archive === null) {

                    this._LoggerService.log({
                        message: `El Usuario ${user.email} - No tiene archivos en la carpeta indicada`,
                        response: {
                            user: {
                                ...user
                            },
                            body: {
                                data: {
                                    funnelLibrary_id: funnelLibrary_id
                                }
                            }
                        },
                        context: 'FunnelLibraryService - initial_byLibrary',
                    });

                    throw new HttpException({
                        ok: false,
                        statusCode: 404,
                        message: [
                            {
                                text: 'No se ha encontrado el archivo indicado',
                                type: 'global'
                            }
                        ],
                        err: 'No se ha encontrado el archivo indicado'
                    }, 404)

                }

                resp_1.data.archives_id = [aux_archive];

                for (const [i, item] of resp_1.data.archives_id.entries()) {

                    if (item.funnels_id.length > 0) {
                        item.funnels_id = await item.funnels_id.sort((a, b) => a.pos - b.pos);
                        for (const [i, element] of item.funnels_id.entries()) {
                            element.stages = await element.stages.sort((a, b) => a.pos - b.pos);
                        }
                    }

                }

                _Response = {
                    ...resp_1,
                    statusCode: 200
                }

                this._LoggerService.debug({
                    // message: `El Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - Ha obtenido su información de funnel builder inicial `,
                    message: `El Usuario ${user.email} - Ha obtenido su información de funnel builder inicial `,
                    response: {
                        user: {
                            ...user
                        },
                        body: {
                            data: { ..._Response.data }
                        }
                    },
                    context: 'FunnelLibraryService - initial_byLibrary',
                });

            }
            // Si el folder es compartido

        } catch (error) {

            _Response = error;
            // _Response.data = null

            this._LoggerService.log({
                // message: `El Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - No tiene información de embudos inicial `,
                message: `El Usuario ${user.email} - No tiene información de embudos inicial ni compartida con este folder`,
                response: {
                    user: {
                        ...user
                    },
                    body: {
                        data: null
                    }
                },
                context: 'FunnelLibraryService - initial_byLibrary',
            });

        }

        await this._TransactionsService.commitTransaction(queryRunner)

        return _Response;

    }

    async create_folder(CreateFunnelLibraryDto: CreateFunnelLibraryDto, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            let data_funnelLibraryPermisions = this._LibraryPermisions_et_repository.create({
                elementsEffect: 'all',
                permisionType: 0,
                user_id: user,
                updatedAt: this._dateService.setDate(),
            });

            let data_funnelLibrary = this._FunnelLibrary_et_repository.create({
                ...CreateFunnelLibraryDto,
                __v: 0,
                user_id: user,
            });

            let created_FunnelLibrary = await this._processData.process_create<FunnelLibrary_et>({
                body: data_funnelLibrary,
                entity: FunnelLibrary_et,
                queryRunner: queryRunner,
            })
                .then(({ data }) => data)

            let data_configPlanner = this._ConfigPlanner_et_repository.create({
                dash: {},
                toolsSettingsConfig: [],
                archives_id: null,
                // __v: 0
            })

            let created_config = await this._processData.process_create<ConfigPlanner_et>({
                body: data_configPlanner,
                entity: ConfigPlanner_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);

            let data_archive = this._FunnelArchive_et_repository.create({
                name: 'Archivo 1',
                config_step_id: created_config,
                funnelLibrary_id: created_FunnelLibrary,
                user_id: user,
                __v: 0,
            });

            let created_archive = await this._processData.process_create<FunnelArchive_et>({
                body: data_archive,
                entity: FunnelArchive_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);


            created_config = await this._plannerService.create_configsPlanner({
                ...created_config,
                archives_id: created_archive
            }, user, queryRunner).then(({ data }) => data);

            await this._processData.process_create<LibraryPermisions_et>({
                body: {
                    ...data_funnelLibraryPermisions,
                    funnelLibrary_id: created_FunnelLibrary,
                },
                entity: LibraryPermisions_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);

            _Response = {
                statusCode: 200,
                ok: true,
                message: [
                    {
                        text: 'Carpeta de embudo creada',
                        type: 'global'
                    }
                ],
                data: created_FunnelLibrary,
            }

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (err) {

            console.log('err', err);

            _Response = err;

            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    async findShareWithMe(user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et[]>> {

        let _Response: _response_I<FunnelLibrary_et[]>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            // TODO mejorar la información que viene de este query
            // TODO Implementar la paginación a futuro
            const args: _argsFindMany_I = {
                findObject: {
                    where: {
                        "user_id._id": user._id
                    },
                    relations: [
                        'user_id',
                        'funnelLibrary_id',
                        'funnelLibrary_id.user_id',
                        'funnelLibrary_id.archives_id',
                        'funnelLibrary_id.archives_id.config_step_id',
                        'funnelLibrary_id.archives_id.funnels_id',
                        'funnelLibrary_id.archives_id.funnels_id.stages',
                        'funnelLibrary_id.archives_id.funnels_id.customizeProcess_step_id',

                    ],
                    select: {
                        user_id: {
                            _id: true,
                            name: true,
                            email: true
                        }
                    },
                },
            }

            let resp = await this._processData.process_getAll<LibraryPermisions_et>({
                argsFindMany: args,
                entity: LibraryPermisions_et,
                queryRunner: queryRunner
            });

            let aux_resp = resp.data.map(res => {

                let aux_item: FunnelLibrary_et = structuredClone(res.funnelLibrary_id)

                if (aux_item.user_id._id === user._id) {
                    return null;
                } else {

                    return aux_item
                }

            });

            aux_resp = aux_resp.filter(res => res !== null);

            _Response = structuredClone(resp);

            _Response = {
                ..._Response,
                data: [...aux_resp],
                statusCode: (aux_resp.length > 0) ? 200 : 404,
                message: [
                    {
                        text: (aux_resp.length > 0) ? 'Carpetas de embudos compartidas conmigo' : 'No hay carpetas de embudos compartidas conmigo',
                        type: 'global'
                    }
                ]
            }

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {

            _Response = error;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    async find(page: number = 1, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et[]>> {

        let _Response: _response_I<FunnelLibrary_et[]>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            // TODO mejorar la información que viene de este query
            // TODO Implementar la paginación a futuro
            const args: _argsPagination_I = {
                findObject: {
                    where: {
                        "user_id._id": user._id
                    },
                    relations: [
                        'user_id',
                        'archives_id',
                        'archives_id.config_step_id',
                        'archives_id.funnels_id',
                        'archives_id.funnels_id.stages',
                        'archives_id.funnels_id.customizeProcess_step_id',
                        'funnel_library_permision_id',
                        'funnel_library_permision_id.user_id'
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
                    route: '/',
                },
            }

            const resp = await this._processData.process_getAll<FunnelLibrary_et>({
                argsFindMany: args,
                entity: FunnelLibrary_et,
                queryRunner: queryRunner
            });

            _Response = structuredClone(resp);

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {
            console.log(error);
            _Response = error;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);
        }
        return _Response;

    }

    // async findAll(page: number = 1, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et[]>> {

    //     let _Response: _response_I<FunnelLibrary_et[]>;


    //     let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

    //     try {

    //         const args: _argsPagination_I = {
    //             findObject: {
    //                 where: {
    //                     "user_id._id": user._id
    //                 },
    //                 relations: [
    //                         'user_id',
    // 'archives_id',
    // 'archives_id.config_step_id',
    // 'archives_id.funnels_id',
    // 'archives_id.funnels_id.stages',
    // 'archives_id.funnels_id.customizeProcess_step_id',
    // 'funnel_library_permision_id',
    // 'funnel_library_permision_id.user_id'
    //                 ],
    //                 // select: {
    //                 //     user_id: {
    //                 //         _id: true,
    //                 //         name: true,
    //                 //         email: true
    //                 //     }

    //                 // },

    //             },
    //             options: {
    //                 page: page,
    //                 limit: 12,
    //                 // limit: this._configP._get(_Configuration_Keys.DEFAULT_LIMIT),
    //                 route: '/',
    //             },
    //             populate: {
    //                 user_id: {
    //                     select: [
    //                         "_id",
    //                         "name",
    //                         "email",
    //                     ]
    //                 },

    //             }
    //         }

    //         await this._processData.process_getAll_paginate<FunnelLibrary_et>({
    //             argsFindMany: { ...args },
    //             entity: FunnelLibrary_et,
    //             queryRunner: queryRunner
    //         }).then(async (resp) => {

    //             _Response = structuredClone(resp);

    //         });


    //         if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

    //     } catch (error) {
    //         _Response = error;
    //         if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);
    //     }
    //     return _Response;

    // }

    async findOne(_id: string, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);
        try {

            let args: _argsFind_I = {
                findObject: {
                    where: {
                        _id: _id,
                        user_id: {
                            _id: user._id
                        }
                    },
                    relations: [
                        'user_id',
                        'archives_id',
                        'archives_id.config_step_id',
                        'archives_id.funnels_id',
                        'archives_id.funnels_id.stages',
                        'archives_id.funnels_id.customizeProcess_step_id',
                        'funnel_library_permision_id',
                        'funnel_library_permision_id.user_id'
                    ],

                },
                populate: {
                    user_id: {
                        select: [
                            "_id",
                            "name",
                            "email",
                        ]
                    }
                }
            }

            await this._processData.process_getOne<FunnelLibrary_et>({
                argsFind: args,
                entity: FunnelLibrary_et,
                queryRunner: queryRunner
            }
            ).then(async (resp) => {

                _Response = structuredClone(resp);

                if (resp.statusCode === 200) {
                    _Response.message = [
                        {
                            text: 'Carpeta de embudos obtenida',
                            type: 'global'
                        }
                    ]
                }

            });

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {
            _Response = error;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);
        }
        return _Response;

    }

    async findOne_byUser(user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;


        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {
            let args: _argsFind_I = {
                findObject: {
                    where: {
                        "user_id._id": user._id
                    },
                    relations: [
                        'user_id',
                        'archives_id',
                        'archives_id.config_step_id',
                        'archives_id.funnels_id',
                        'archives_id.funnels_id.stages',
                        'archives_id.funnels_id.customizeProcess_step_id',
                        'funnel_library_permision_id',
                        'funnel_library_permision_id.user_id'
                    ],

                },
                populate: {
                    user_id: {
                        select: [
                            "_id",
                            "name",
                            "email",
                        ]
                    }
                }
            }

            await this._processData.process_getOne<FunnelLibrary_et>({
                argsFind: args,
                entity: FunnelLibrary_et,
                queryRunner: queryRunner
            }
            ).then(async (resp) => {

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

            })
            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {
            _Response = error;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);
        }
        return _Response;

    }

    async update(funnelLibrary_id: string, body: any, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;
        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {
            let aux_funnelLibrary = await this.findOne(funnelLibrary_id, user, _prev_queryRunner).then(({ data }) => data);

            aux_funnelLibrary.name = body.name;

            await this._processData.process_create<FunnelLibrary_et>({
                body: aux_funnelLibrary,
                entity: FunnelLibrary_et,
                queryRunner: queryRunner,
            }).then(resp => {

                _Response = structuredClone(resp);

                _Response.message = [
                    {
                        text: 'Carpeta de embudos actualizada',
                        type: 'global'
                    }
                ]

            });

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {
            _Response = error;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);
        }
        return _Response;

    }

}
