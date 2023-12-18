import { HttpException, Injectable } from '@nestjs/common';
import { _argsFind, _argsPagination, _response_I } from '../../../common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, QueryRunner, Repository } from 'typeorm';
import { User_et } from '../entities';
import { DateProcessService, ProcessDataService } from '../../../common/adapters';
import { User_I } from '../interfaces';
import { TransactionsService } from '../../../database/services/transactions.service';


@Injectable()
export class UsersService {

    constructor(

        @InjectRepository(User_et)
        private readonly _Users_et_repository: Repository<User_et>,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,
        private readonly dataSource: DataSource,

        private readonly _TransactionsService: TransactionsService

    ) {

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


        await this._processData.process_delete<User_et>(this._Users_et_repository, {
            findObject: {
                where: {
                    _id: user._id
                }
            }
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

            await this._TransactionsService.commitTransaction(queryRunner, _prev_queryRunner);

        } catch (error) {

            _Response = error;
            await this._TransactionsService.rollbackTransaction(queryRunner, _prev_queryRunner);

            // throw new HttpException(_Response, _Response.statusCode);
        }

        return _Response;

    }



    // forma de usar
    /*
       const args: _argsFind<FindOneOptions> = {
                findObject: {
                    where: {
                        host_id: host_id,
                        host_email: Not(IsNull())
                    }
                }
            }

    */
    async findOne(args: _argsFind): Promise<_response_I<User_et>> {

        let _Response: _response_I<User_et>;

        await this._processData.process_getOne<User_et>(this._Users_et_repository, args).then(async (resp) => {

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

        }, (err) => {

            _Response = {
                ...err
            }


            throw new HttpException(_Response, _Response.statusCode);

        });


        return _Response;

    }

    async findAll(page: number = 1): Promise<_response_I<User_et[]>> {

        let _Response: _response_I<User_et[]>;

        const args: _argsPagination = {
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

        await this._processData.process_getAll_paginate<User_et>(this._Users_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);

        }, (err) => {
            _Response = err;

            throw new HttpException(_Response, _Response.statusCode);
        });

        return _Response;

    }


    async findOneByTerm(term: any): Promise<_response_I<User_et>> {

        let _Response: _response_I<User_et>;

        let args: _argsFind = {
            findObject: {
                ...term
            }
        }

        await this._processData.process_getOne<User_et>(this._Users_et_repository, args).then(response => {

            _Response = response;

            _Response.message = [
                {
                    text: 'Usuario obtenido',
                    type: 'global'
                }
            ]

        }, err => {
            _Response = err;

            // throw new HttpException(_Response, _Response.statusCode);
        })

        return _Response;

    }




}