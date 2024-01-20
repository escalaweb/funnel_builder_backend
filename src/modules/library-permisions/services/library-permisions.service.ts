import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayload_I } from '../../auth/interfaces';
import { _argsFind_I, _response_I } from '../../../common/interfaces';
import { TransactionsService } from '../../../common/services/transactions.service';
import { DateProcessService, ProcessDataService } from '../../../common/adapters';
import { LibraryPermisions_et } from '../entities';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FunnelLibrary_et } from '../../funnel-library/entities/funnel-library.entity';
import { _argsFindMany_I } from '../../../common/interfaces/_responseFindParameters.interface';

import * as uuid from 'uuid';
import { FunnelLibraryService } from '../../funnel-library/services/funnel-library.service';
import { UsersService } from '../../users/services/users.service';
import { User_et } from '../../users/entities';

@Injectable()
export class LibraryPermisionsService {

    constructor(
        @InjectRepository(LibraryPermisions_et)
        private readonly _LibraryPermisions_et_repository: Repository<LibraryPermisions_et>,

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        private readonly _FunnelLibraryService: FunnelLibraryService,
        private readonly _UsersService: UsersService,

        private readonly _processData: ProcessDataService,

        private readonly _processDate: DateProcessService,

        private readonly _TransactionsService: TransactionsService,
    ) {

    }

    // TODO arreglar el tipo de dato de libraryPermisions
    async createPermisions_toLibrary(libraryPermisions: any, funnelLibrary_id: string, user: AuthPayload_I, token: string, _prev_queryRunner?: QueryRunner): Promise<_response_I<LibraryPermisions_et[]>> {

        let _Response: _response_I<LibraryPermisions_et[]>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            const funnelLibrary = await this._FunnelLibraryService.findOne(funnelLibrary_id, user, queryRunner).then(resp => resp.data);

            if (!funnelLibrary) {
                _Response = {
                    ...funnelLibrary,
                    data: null,
                    message: [
                        {
                            text: 'Funnel library no encontrada',
                            type: 'global'
                        }
                    ]
                }
                return _Response;
            }

            // Guardar usuarios actuales del dueño si no existen
            const avaiableUsers = await this._UsersService.getUsers_byOwner(user, token, queryRunner).then(res => res.data)

            let aux_permGuardado: LibraryPermisions_et[] = [];

            await this._processData.process_delete<any>({
                body: funnelLibrary.funnel_library_permision_id,
                entity: LibraryPermisions_et,
                queryRunner: queryRunner
            });

            for (const [i, item] of libraryPermisions.newPermisions.entries()) {

                const userOfPermision: User_et = avaiableUsers.find(u => u.email === item.email);
                const prev_permision: LibraryPermisions_et = funnelLibrary.funnel_library_permision_id.find(p => p.user_id.email === item.email) || null;

                let newPermision: LibraryPermisions_et = this._LibraryPermisions_et_repository.create({
                    ...prev_permision,
                    elementsEffect: 'all',
                    permisionType: item.permisionType,
                    funnelLibrary_id: funnelLibrary,
                    user_id: userOfPermision,
                    updatedAt: this._processDate.setDate(),
                });

                await this._processData.process_create<LibraryPermisions_et>({
                    body: newPermision,
                    entity: LibraryPermisions_et,
                    queryRunner: queryRunner
                }).then(resp => {
                    // _Response.data.push(resp.data);
                    if (resp.data) aux_permGuardado.push(resp.data);

                });

            }
            _Response = {
                ok: true,
                statusCode: 201,
                data: aux_permGuardado,
                message: [
                    {
                        text: (aux_permGuardado.length > 0) ? 'Permisos creados' : 'Permisos no creados',
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

    async findAll_byLibraryId(funnelLibrary_id: string, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<LibraryPermisions_et[]>> {

        let _Response: _response_I<LibraryPermisions_et[]>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        // TODO arreglar la data que retorna y la función de populate

        try {

            let args: _argsFindMany_I = {
                findObject: {
                    where: {
                        "funnelLibrary_id._id": funnelLibrary_id,
                    },
                    relations: [
                        'user_id',
                        'funnelLibrary_id',
                        'funnelLibrary_id.user_id'
                    ],
                    select: {
                        "user_id": {
                            _id: true,
                            name: true,
                            email: true,
                            tenant_id: true
                        },
                        // "funnelLibrary_id" : {
                        //     user_id: {
                        //     _id: true,
                        //     name: true,
                        //     email: true,
                        //     tenant_id: true
                        //     }
                        // }
                    }
                },
                populate: {
                    funnelLibrary_id: {
                        select: [
                            "_id",
                            "name",
                            "user_id"
                        ]
                    }
                }
            }

            await this._processData.process_getAll<LibraryPermisions_et>({
                argsFindMany: { ...args },
                entity: LibraryPermisions_et,
                queryRunner: queryRunner
            }).then((response) => {

                let aux: LibraryPermisions_et[] = response.data;

                // Validar que los permisos sean del mismo tenant correspondiente
                aux = aux.filter(r => r.user_id.tenant_id === user.tenant_id);

                aux = aux.map(r => {
                    let aux: LibraryPermisions_et = {
                        ...r
                    }
                    delete aux.user_id.tenant_id;
                    return {
                        ...aux
                    }
                })

                _Response = {
                    ...response,
                    data: aux,
                    message: [
                        {
                            text: (aux.length > 0) ? 'Permisos encontrados' : 'Permisos no encontrados',
                            type: 'global'
                        }
                    ]
                }

            });


            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);


        } catch (error) {

            console.log('error', error);

            _Response = error;
            _Response.err = error.err;

            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;
    }


    async findOne_byId(libraryPermision_id: string, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<LibraryPermisions_et>> {

        let _Response: _response_I<LibraryPermisions_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            let args: _argsFind_I = {
                findObject: {
                    where: {
                        _id: libraryPermision_id,
                        "user_id._id": user._id
                    },
                    relations: [
                        'user_id',
                        'funnelLibrary_id'
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

            await this._processData.process_getOne<LibraryPermisions_et>({
                argsFind: args,
                entity: LibraryPermisions_et,
                queryRunner: queryRunner
            }).then((response) => {

                _Response = response;

                _Response.message = [
                    {
                        text: (_Response.data) ? 'Permiso encontrado' : 'Permiso no encontrado',
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
