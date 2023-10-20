import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";

import { FunnelLibrary_et } from "../entities";
import { _argsFind, _argsPagination, _response_I } from "../../../common/interfaces";
import { CreateFunnelLibraryDto } from "../dto";
import { AuthPayload_I } from "../../auth/interfaces/_jwt-payload.interface";
import { FunnelLibrary_I } from "../interfaces";
import { FunnelBody_et } from "../../funnels/entities";
import { ConfigPlanner_et } from "../../planner/entities";



@Injectable()
export class FunnelLibraryService {


    constructor(

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

    ) {


        //     this._processData.reconvert_format_populate({
        //         param: 'user',
        //         to: 'user_id',
        //         select: 'username_id name email'
        //     },
        //     {
        //     "_id": "a11d4d55-4e9a-4575-83c6-430ce3254dc4",
        //     "__v": 0,
        //     "name": "Carpeta de embudos",
        //     "createdAt": "1694201970781",
        //     "updatedAt": "0",
        //     "user_id": "693bc9de-3418-4873-b9b5-d94b186efad1",
        //     "user": {
        //         "_id": "693bc9de-3418-4873-b9b5-d94b186efad1",
        //         "__v": 0,
        //         "username_id": "9bfec8a9-03d3-42ec-b4f6-73759781165d",
        //         "tenant_id": "7ca9c2a4-fa4c-11ed-84fd-3acdd3b01b9a",
        //         "name": "Álvaro",
        //         "email": "alvaro@escala.com",
        //         "createdAt": "1694201647186",
        //         "lastAccessAt": "0"
        //     }
        // },
        //     ).then(resp => {

        //      })

    }


    async create(CreateFunnelLibraryDto: CreateFunnelLibraryDto, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;

        // let data: FunnelLibrary_I = {
        let data: any = {
            ...CreateFunnelLibraryDto,
            user_id: user._id
        }

        await this._processData.process_create<FunnelLibrary_et>(this._FunnelLibrary_et_repository, data).then(response => {

            _Response = response;

            _Response.message = [
                {
                    text: 'Carpeta de embudos creada exitosamente',
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

    async findAll(page: number = 1, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et[]>> {

        let _Response: _response_I<FunnelLibrary_et[]>;

        const args: _argsPagination = {
            findObject: {
                where: {
                    "user_id._id": user._id
                },
                relations: [
                    'user_id',
                    'config_step_id',
                    'funnels_id',
                    'funnels_id.stages',
                    'funnels_id.customizeProcess_step_id'

                ],
                select: {
                    user_id: {
                        _id: true,
                        name: true,
                        email: true
                    }

                },
                order: {
                    funnels_id: {
                        pos: 'ASC',
                        stages: {
                            pos: 'ASC'
                        },
                        customizeProcess_step_id: {
                            pos: 'ASC'
                        }
                    },

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

    /*

    async create(createFunnelLibraryDto: CreateFunnelLibraryDto, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_I[]>> {

        let _Response: _response_I<FunnelLibrary_I[]>;

        let data: FunnelLibrary_I = {
            ...createFunnelLibraryDto,
            user_id: user._id
        }

        await this._processData.process_create<FunnelLibrary_I, schemaKey_I>(this.FunnelLibrary_Model, data).then(response => {
            _Response = response;

            _Response.message = [
                {
                    text: 'Carpeta de embudos creada exitosamente',
                    type: 'global'
                }
            ]

        }, err => {
            _Response = err;
            throw new HttpException(_Response, _Response.statusCode);
        })

        return _Response;

    }

    async findAll(user: AuthPayload_I): Promise<_response_I<FunnelLibrary_I[]>> {

        let _Response: _response_I<FunnelLibrary_I[]>;

        let args: _argsPagination<FunnelLibrary_I> = {
            findObject: {
                user_id: user._id
            },
            options: {
                limit: 'all',
                page: 0
            }
        }

        await this._processData.process_getAll<FunnelLibrary_I, schemaKey_I>(this.FunnelLibrary_Model, args).then(response => {

            _Response = response;

            _Response.message = [
                {
                    text: 'Carpetas de embudos obtenidas',
                    type: 'global'
                }
            ]

        }, err => {
            _Response = err;

            throw new HttpException(_Response, _Response.statusCode);
        })


        return _Response;


    }

    async findOne(_id: string, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_I>> {
        // return `This action returns a #${id} funnelLibrary`;

        if (isUUID(_id)) {

            let _Response: _response_I<FunnelLibrary_I>;

            let args: _argsFind = {
                findObject: {
                    _id: _id,
                    user_id: user._id
                },
                populate:[
                    {
                        path: "user_id", model: "Users"
                    },
                    {
                        path: "funnels", model: "Funnels"
                    }
                ]
            }

            await this._processData.process_getOne<FunnelLibrary_I, schemaKey_I>(this.FunnelLibrary_Model, args).then(response => {

                _Response = response;

                _Response.message = [
                    {
                        text: 'Carpeta de embudo obtenida',
                        type: 'global'
                    }
                ]

            }, err => {
                _Response = err;

                throw new HttpException(_Response, _Response.statusCode);
            })


            return _Response;

        } else {

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

        }


    }

    async update(_id: string, updateFunnelLibraryDto: UpdateFunnelLibraryDto, user: AuthPayload_I) {
        // return `This action updates a #${id} funnelLibrary`;

        if (isUUID(_id)) {

             let _Response: _response_I<FunnelLibrary_I>;

            let args: _argsUpdate<FunnelLibrary_I > = {
                findObject: {
                    _id: _id,
                    user_id: user._id
                },
                set: {
                    ...updateFunnelLibraryDto as FunnelLibrary_I,
                    updatedAt: {
                        date: this._dateService.setDate(),
                        type: 'Date'
                    }


                }
            }

            await this._processData.process_updateOne<FunnelLibrary_I, schemaKey_I>(this.FunnelLibrary_Model, args).then(response => {

                _Response = response;

                _Response.message = [
                    {
                        text: 'Carpeta de embudo actualizada',
                        type: 'global'
                    }
                ]
            })

             return _Response;

        } else {

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

        }

    }

    remove(id: number) {
        return `This action removes a #${id} funnelLibrary`;
    }

    */
}
