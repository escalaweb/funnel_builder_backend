import { HttpException, Injectable } from '@nestjs/common';
import { _argsFind, _argsPagination, _response_I } from '../../../common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { User_et } from '../entities';
import { DateProcessService, ProcessDataService } from '../../../common/adapters';
import { User_I } from '../interfaces';


@Injectable()
export class UsersService {

    constructor(

        @InjectRepository(User_et)
        private readonly _Users_et_repository: Repository<User_et>,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,
        private readonly dataSource: DataSource,

    ) {

    }


    async test(){

        await this.create({
            username_id: "ewqdsdsdf_2",
            tenant_id: "ewqdsdsdf_2",
            name: 'name',
            email: 'email',
        }).then( resp => {
            console.log('creado', resp);
        })

    }

    async test_transaction() {

        // await this.dataSource.manager.transaction(async (transactionalEntityManager: EntityManager) => {
        //     // Aquí puedes realizar tus operaciones dentro de la transacción

        //     let createdAt_FK = this._datesService.create_noSv();

        //     let lastAccessAt_FK = this._datesService.create_noSv();

        //     await transactionalEntityManager.save(createdAt_FK).then((resp) => {
        //         createdAt_FK = resp;
        //     });
        //     await transactionalEntityManager.save(lastAccessAt_FK).then((resp) => {
        //         lastAccessAt_FK = resp;
        //     });

        //     let user = this._Users_et_repository.create(
        //         {
        //             username_id: "ewqdsdsdf",
        //             createdAt_FK: createdAt_FK,
        //             lastAccessAt_FK: lastAccessAt_FK
        //         }
        //     )

        //     await transactionalEntityManager.save(user).then((resp) => {

        //         user = resp;
        //         console.log("resp", user);


        //     });



        // }).catch((err) => {

        // });


    }

    async create(data: User_et): Promise<_response_I<User_et>> {

        let _Response: _response_I<User_et>;

        await this._processData.process_create<User_et>(this._Users_et_repository, data).then(response => {

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

            _Response.message = [
                {
                    text: 'Usuario obtenido',
                    type: 'global'
                }
            ]

        }).catch((err) => {

            let _Response: _response_I<any> = {
                ok: false,
                statusCode: 404,
                data: null,
                // err: err,
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

        }).catch((err) => {
            _Response = err;

            throw new HttpException(_Response, _Response.statusCode);
        });

        return _Response;

    }


    async findOneByTerm(term: any) : Promise<_response_I<User_et>> {

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