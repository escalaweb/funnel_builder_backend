import { HttpException, Injectable } from '@nestjs/common';
import { _argsFind_I, _argsPagination_I, _response_I } from '../../../common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { User_et } from '../entities';
import { ProcessDataService, _HttpService } from '../../../common/adapters';
import { User_Escala_I, User_Escala_Request_I } from '../interfaces';
import { TransactionsService } from '../../../common/services/transactions.service';
import { AuthPayload_I } from '../../auth/interfaces';
import { ConfigProjectService } from '../../../config/config.service';
import { _Configuration_Keys } from '../../../config/config.keys';


@Injectable()
export class UsersService {

    constructor(

        // @InjectRepository(User_et)
        // private readonly _Users_et_repository: Repository<User_et>,

        private readonly _processData: ProcessDataService,

        private readonly _HttpService: _HttpService,

        private readonly _TransactionsService: TransactionsService,
        private readonly _ConfigProjectService: ConfigProjectService

    ) {

    }

    async getUsers_byOwner(user: AuthPayload_I, token: string, _prev_queryRunner?: QueryRunner): Promise<_response_I<AuthPayload_I[]>> {

        let _Response: _response_I<AuthPayload_I[]>;

        let usersReturn: AuthPayload_I[] = [];

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            let url: string = (this._ConfigProjectService._get(_Configuration_Keys.NODE_ENV) === 'development') ? 'https://api.dev.exitoweb.com' : 'https://api.escala.com';

            const users = await this._HttpService._get<User_Escala_Request_I>(
                url + '/app/customer/users/search?page=0&size=200&sort_field=modified&sort_direction=DESC',
                {
                    "headers": {
                        "Authorization": token
                    }
                }
            );

            const aux_users: User_Escala_I[] = users.data.data;

            for (const [i, item] of aux_users.entries()) {

                // Valido que el usuario exista previamente
                const args: _argsFind_I<User_et> = {
                    findObject: {
                        where: {
                            email: item.email,
                        }
                    }
                }

                let User_data: User_et = await this.findOne(args).then(resp => resp.data);

                if (!User_data) {

                    User_data = await this.create({
                        username_id: item.properties.sub,
                        name: item.name,
                        email: item.email,
                        tenant_id: item.tenant_id,
                    }, queryRunner).then(resp => resp.data)

                }

                usersReturn.push({
                    _id: User_data._id,
                    email: User_data.email,
                    name: User_data.name,
                    tenant_id: User_data.tenant_id,
                    username_id: User_data.username_id
                })

            }

            if (usersReturn.length === 0) {

                _Response = {
                    ok: true,
                    statusCode: 404,
                    message: [{
                        text: 'Usuarios no encontrados',
                        type: 'global'
                    }],
                    data: []
                }

                throw new HttpException(_Response, _Response.statusCode);

            }

            _Response = {
                ok: true,
                statusCode: 200,
                message: [{
                    text: 'Usuarios encontrados',
                    type: 'global'
                }],
                data: [...usersReturn]
            }

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {

            _Response = error;

            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    async delete_user(_id: string): Promise<_response_I<User_et>> {

        let _Response: _response_I<User_et>;

        let user: User_et;

        await this.findOne({
            findObject: {
                where: {
                    _id: _id

                }
            }
        }).then(async (resp) => {

            if (resp.statusCode !== 200) {
                _Response = resp;
                throw new HttpException(_Response, _Response.statusCode);

            }

            user = resp.data;


        })

        await this._processData.process_delete<any>({
            argsFind: {
            findObject: {
                where: {
                    _id: user._id
                }
            },
            },
            queryRunner: null,
            entity: User_et
        }).then(response => {

            _Response = response;
            _Response.data = user;

        }, err => {
            _Response = err;
            _Response.message = [
                {
                    text: 'Error al eliminar usuario',
                    type: 'global'
                }
            ]
            throw new HttpException(_Response, _Response.statusCode);
        })

        return _Response;

    }

    async create(data: User_et, _prev_queryRunner?: QueryRunner): Promise<_response_I<User_et>> {

        let _Response: _response_I<User_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            await this._processData.process_create<User_et>({
                body: data,
                entity: User_et,
                queryRunner: queryRunner
            }).then(response => {

                _Response = response;

                _Response.message = [
                    {
                        text: 'Datos de usuario guardados',
                        type: 'global'
                    }
                ]

            });

            await this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {

            _Response = error;
            await this._TransactionsService.rollbackTransaction(queryRunner);

            // throw new HttpException(_Response, _Response.statusCode);
        }

        return _Response;

    }


    async findOne(args: _argsFind_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<User_et>> {

        let _Response: _response_I<User_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            await this._processData.process_getOne<User_et>({
                argsFind: args,
                entity: User_et,
                queryRunner: queryRunner
            }).then(async (resp) => {

                _Response = resp;

                if (_Response.statusCode != 200) {
                    _Response.message = [
                        {
                            text: 'No se encontró un usuario con este id',
                            type: 'global'
                        }
                    ]
                    throw new HttpException(_Response, _Response.statusCode);
                }

                _Response.message = [
                    {
                        text: 'Usuario obtenido',
                        type: 'global'
                    }
                ]

                return _Response;

            });


            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);


        } catch (error) {

            _Response = error;

            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    async findAll(page: number = 1, _prev_queryRunner?: QueryRunner): Promise<_response_I<User_et[]>> {

        let _Response: _response_I<User_et[]>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            const args: _argsPagination_I = {
                findObject: {
                    relations: ['users']
                },
                options: {
                    page: page,
                    limit: 12,
                    // limit: this._configP._get(_Configuration_Keys.DEFAULT_LIMIT),
                    route: '/',
                }
            }

            await this._processData.process_getAll_paginate<User_et>({
                argsFindMany: { ...args },
                queryRunner: queryRunner,
                entity: User_et
            }).then(async (resp) => {

                _Response = structuredClone(resp);

            })

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {
            _Response = error;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);
        }
        return _Response;

    }


    async findOneByTerm(term: any, _prev_queryRunner?: QueryRunner): Promise<_response_I<User_et>> {

        let _Response: _response_I<User_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            let args: _argsFind_I = {
                findObject: {
                    ...term
                }
            }

            await this._processData.process_getOne<User_et>({
                argsFind: args,
                entity: User_et,
                queryRunner: queryRunner
            }).then(response => {

                _Response = response;

                _Response.message = [
                    {
                        text: 'Usuario obtenido',
                        type: 'global'
                    }
                ]

            })

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);


        } catch (error) {

            _Response = error;

            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }


}