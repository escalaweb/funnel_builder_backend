import { CreatePermisionsRequestDto } from '../dto/create-permisions-request.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateProcessService, ProcessDataService } from '../../../common/adapters';
import { Brackets, QueryRunner, Repository } from 'typeorm';
import { TransactionsService, _LoggerService } from '../../../common/services';
import { UpdatePermisionsRequestDto } from '../dto/update-permisions-request.dto';

import { PermisionsRequest_et } from '../entities/permisions-request.entity';

import { _argsFindMany_I, _argsFind_I, _response_I } from '../../../common/interfaces';
import { AuthPayload_I } from '../../auth/interfaces';
import { FunnelLibrary_et } from '../../funnel-library/entities/funnel-library.entity';
import { LibraryPermisions_et } from '../../library-permisions/entities';

@Injectable()
export class PermisionsRequestsService {

    constructor(
        @InjectRepository(PermisionsRequest_et)
        private readonly _PermisionsRequest_et_repository: Repository<PermisionsRequest_et>,

        private readonly _LoggerService: _LoggerService,

        private readonly _processData: ProcessDataService,

        private readonly _TransactionsService: TransactionsService

    ) {

    }

    async create(createPermisionsRequestDto: CreatePermisionsRequestDto, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<PermisionsRequest_et>> {

        let _Response: _response_I<PermisionsRequest_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            const args1: _argsFind_I = {
                findObject: {
                    where: {
                        'permisionType': 1,
                        'funnelLibrary_id._id': createPermisionsRequestDto.funnelLibrary_id,
                        'user_id._id': user._id
                    },
                    relations: [
                        'funnelLibrary_id',
                        'user_id'
                    ]
                },
            }
            let created_FunnelLibrary = await this._processData.process_getOne<LibraryPermisions_et>({
                argsFind: args1,
                entity: LibraryPermisions_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data) || null;

            if (created_FunnelLibrary === null || created_FunnelLibrary.permisionType !== 1) {
                _Response = {
                    ok: false,
                    statusCode: 400,
                    message: [
                        {
                            text: 'No se cumplen con requisitos para crear la solicitud',
                            type: 'global'
                        }
                    ]
                };
                throw _Response
            }

            /*     const args2: _argsFind_I = {
                    findObject: {
                        where: {
                            'permisionType': 1,
                            'funnelLibrary_id._id': createPermisionsRequestDto.funnelLibrary_id,
                            "user_id._id": user._id
                        },
                        relations: [
                            'funnelLibrary_id',
                            'user_id'
                        ]
                    },
                }
                let created_archive = await this._processData.process_getOne<FunnelArchive_et>({
                    argsFind: args1,
                    entity: FunnelArchive_et,
                    queryRunner: queryRunner,
                }).then(({ data }) => data) || null;

                console.log('created_FunnelLibrary', created_FunnelLibrary); */

            const permision_request = this._PermisionsRequest_et_repository.create({
                funnelLibrary_id: created_FunnelLibrary.funnelLibrary_id,
                requested_by: user,
            });

            const resp = await this._processData.process_create<PermisionsRequest_et>({
                entity: PermisionsRequest_et,
                body: permision_request,
                queryRunner: queryRunner,
            })

            _Response = {
                ok: true,
                statusCode: 201,
                data: resp.data,
                message: [
                    {
                        text: 'Solicitud creada',
                        type: 'global'
                    }
                ]
            };

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);


        } catch (err) {
            _Response = err;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;
    }

    async findAll(funnel_library: string, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<PermisionsRequest_et[]>> {

        let _Response: _response_I<PermisionsRequest_et[]>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            const args1: _argsFindMany_I = {
                findObject: {
                    where: [
                        {
                            'funnelLibrary_id': { '_id': funnel_library },
                            'requested_by': { '_id': user._id }
                        },
                        {
                            'funnelLibrary_id': { '_id': funnel_library },
                            'served_by': { '_id': user._id }
                        },
                        {
                            'funnelLibrary_id': {
                                '_id': funnel_library,
                                'user_id': {
                                    '_id': user._id
                                }
                            },
                        }
                    ],
                    relations: [
                        'requested_by',
                        'served_by',
                        'funnelLibrary_id',
                        'funnelLibrary_id.user_id',
                    ],
                    select: {
                        "requested_by": {
                            _id: true,
                            name: true,
                            email: true,
                        },
                        "served_by": {
                            _id: true,
                            name: true,
                            email: true,
                        }
                    }
                },
            }
            let resp = await this._processData.process_getAll<PermisionsRequest_et>({
                argsFindMany: args1,
                entity: PermisionsRequest_et,
                queryRunner: queryRunner,
            });

            if (resp.statusCode === 404) {

                _Response = {
                    ok: false,
                    statusCode: 404,
                    data: [],
                    message: [
                        {
                            text: 'No se encontraron resultados',
                            type: 'global'
                        }
                    ]
                };

                throw _Response;

            }

            _Response = {
                ...resp
            }

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (err) {
            _Response = err;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    async update(permision_request: string, updatePermisionsRequestDto: UpdatePermisionsRequestDto, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<PermisionsRequest_et>> {

        let _Response: _response_I<PermisionsRequest_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            const args1: _argsFind_I = {
                findObject: {
                    where: {
                        '_id': permision_request,
                        'answered': false,
                        'funnelLibrary_id': {
                            'user_id': {
                                '_id': user._id
                            }
                        },
                    },
                    relations: [
                        'requested_by',
                        'served_by',
                        'funnelLibrary_id',
                        'funnelLibrary_id.user_id',
                        'funnelLibrary_id.funnel_library_permision_id',
                        'funnelLibrary_id.funnel_library_permision_id.user_id',
                    ],
                    select: {
                        "requested_by": {
                            _id: true,
                            name: true,
                            email: true,
                        },
                        "served_by": {
                            _id: true,
                            name: true,
                            email: true,
                        }
                    }
                },
            }
            let resp = await this._processData.process_getOne<PermisionsRequest_et>({
                argsFind: args1,
                entity: PermisionsRequest_et,
                queryRunner: queryRunner,
            });

            // console.log('resp', resp);

            if (resp.statusCode === 404) {
                _Response = {
                    ok: false,
                    statusCode: 404,
                    message: [
                        {
                            text: 'No se cumplen con requisitos para modificar la petición, o no existe la petición',
                            type: 'global'
                        }
                    ]
                };
                throw _Response
            }

            const requested_by = resp.data.requested_by;

            let permision: LibraryPermisions_et = resp.data.funnelLibrary_id.funnel_library_permision_id.find((permision: LibraryPermisions_et) => permision.user_id._id === requested_by._id);

            permision = {
                ...permision,
                permisionType: updatePermisionsRequestDto.permisionType,
                updatedAt: new DateProcessService().setDate()
            };

            let save_permision_request = resp.data;

            save_permision_request = {
                ...save_permision_request,
                answered: true,
                served_by: user,
                updatedAt: new DateProcessService().setDate()
            }

            await this._processData.process_create<LibraryPermisions_et>({
                entity: LibraryPermisions_et,
                body: permision,
                queryRunner: queryRunner,
            });

            let resp_saved = await this._processData.process_create<PermisionsRequest_et>({
                entity: PermisionsRequest_et,
                body: save_permision_request,
                queryRunner: queryRunner,
            });

            delete resp_saved.data.funnelLibrary_id;

            _Response = {
                ok: true,
                statusCode: 200,
                message: [
                    {
                        text: 'Petición de permiso actualizado',
                        type: 'global'
                    }
                ],
                data: resp_saved.data
            }

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (err) {

            console.log('err', err);
            _Response = err;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }


}


