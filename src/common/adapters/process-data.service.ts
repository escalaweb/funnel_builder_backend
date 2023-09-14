
import { Injectable } from '@nestjs/common';
import { DateProcessService } from '.';
import { Reformat_Populate_I, _argsFind, _responseMessage_I, _response_I } from '../interfaces';
import { _argsUpdate } from '../interfaces/responseUpdate.interface';
import { Repository, FindOneOptions } from 'typeorm';
import { _argsPagination, _paginateByArray_I } from '../interfaces/_responsePaginator.interface';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { _paginatorModel_I } from '../interfaces/_response.interface';

import * as _ from 'lodash';


@Injectable()
export class ProcessDataService {


    constructor(
        // private readonly _dateProcessService: DateProcessService,


    ) {

    }


    async process_delete<T>(Model: Repository<T>, args: _argsFind<any>): Promise<_response_I<T>> {

        return new Promise(async (resolve, reject) => {

            await Model.delete({ ...args.findObject.where as any }).then(resp => {
                console.log('a eliminar', args);
                console.log('eliminado', resp);
                let _resp: _response_I<T> = {
                    ok: true,
                    statusCode: 200,
                    data: null,
                    message: [
                        {
                            text: 'Elemento removido correctamente',
                            type: 'global'
                        }
                    ]
                }
                resolve(_resp)

            }, err => {

                let _resp: _response_I<T> = {
                    ok: true,
                    statusCode: 400,
                    data: null,
                    err: err,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        }
                    ]
                }
                reject(_resp)

            });

        })

    }

    async process_create<T>(Model: Repository<T>, body: any): Promise<_response_I<T>> {

        return new Promise(async (resolve, reject) => {

            // const entity = Model.create(body) as T;

            // console.log('entity', entity);



            await Model.save(body).then(async (resp) => {

                let _resp: _response_I<T> = {
                    ok: true,
                    statusCode: 201,
                    data: resp,
                }
                resolve(_resp)

            }, err => {

                let _resp: _response_I<T> = {
                    ok: false,
                    statusCode: 400,
                    data: body,
                    err: err,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        }
                    ]
                }
                reject(_resp);

            })

        })

    }

    async process_update<T>(Model: Repository<T>, _id: string, updateBody: any): Promise<_response_I<T>> {

        return new Promise(async (resolve, reject) => {

            console.log('dato update', updateBody);

            await Model.update(_id, { ...updateBody }).then(async (resp) => {

                let _resp: _response_I<T> = {
                    ok: true,
                    statusCode: 200,
                    data: resp.raw,
                }
                resolve(_resp)

            }, err => {

                let _resp: _response_I<T> = {
                    ok: false,
                    statusCode: 400,
                    data: null,
                    err: err,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        }
                    ]
                }
                reject(_resp);

            })

        })

    }

    /*

async process_create_many<T, I>(Model: Model<any, any>, body: T[]): Promise<_response_I<T[]>> {

    return new Promise(async (resolve, reject) => {

        let transactionHub: any[] = [];

        let _resp: _response_I<T[]> = {
            ok: true,
            statusCode: 201,
            message: [{
                text: 'Elementos creados correctamente',
                type: 'global'
            }],
            data: []
        }

        for (const iterator of body.entries()) {
            transactionHub.push(
                await Model.transaction.create(iterator[1])

            )
        }

        await this.transaction(transactionHub).then(resp => {



            for (const iterator of transactionHub.entries()) {

                _resp.data.push(
                    iterator[1]['Put']['Item']
                );
            }

            resolve(_resp);
        }, err => {

                    let _resp: _response_I<T[]> = {
                        ok: false,
                        statusCode: 400,
                        data: body,
                        err: err,
                        message: [
                            {
                                text: 'Algo ha salido mal, intente más tarde',
                                type: 'global'
                            }
                        ]
                    }

                    reject(_resp)

                })


    })

}

*/
    async process_getAll_paginate_array<T>(Model: T[], args: _argsPagination): Promise<_paginateByArray_I<T>> {

        return new Promise(async (resolve, reject) => {

            let { limit, page } = args.options

            limit = Number(limit);
            page = Number(page);

            const objectsArray: any[] = Model; // Reemplaza esto con tu propia lógica para obtener el array
            const totalCount = objectsArray.length;

            const start = (page - 1) * limit;
            const end = start + limit;

            const items = objectsArray.slice(start, end);

            const meta = {
                itemCount: items.length,
                totalItems: totalCount,
                itemsPerPage: limit,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            };

            const links = {
                first: `/?limit=${limit}`,
                previous: ((meta.currentPage - 1) > 0) ? `/?page=${meta.currentPage - 1}&limit=${limit}` : null,
                next: (meta.currentPage < meta.totalPages) ? `/?page=${meta.currentPage + 1}&limit=${limit}` : null,
                last: `/?page=${meta.totalPages}&limit=${limit}`
            };

            const pagination = new Pagination(items, meta, links);

            resolve({
                data: [...pagination.items],
                paginator: {
                    meta: { ...pagination.meta },
                    links: { ...pagination.links }
                },
            });

        })

    }
    async process_getAll_paginate<T>(Model: Repository<T>, args: _argsPagination): Promise<_response_I<T[]>> {

        return new Promise(async (resolve, reject) => {

            let msg: _responseMessage_I[] = [];
            let elements: T[] = [];
            let _resp: _response_I<T[]> = {} as _response_I<T[]>;


            await this.process_getAll(Model, args).then((resp) => {

                elements = resp.data;

            }).catch((err) => {

                reject(err);

            });

            // console.log('que son elements', elements);

            if (elements.length === 0) {

                msg.push({
                    text: 'No se han encontrado resultados',
                    type: 'global'
                });

                _resp = {
                    ok: true,
                    statusCode: 404,
                    data: [],
                    paginator: null,
                    message: msg
                }

                resolve(_resp);
                return;
            }

            await this.process_getAll_paginate_array<T>(elements, args).then(resp => {

                _resp = {
                    ok: true,
                    statusCode: 200,
                    data: [...resp.data],
                    paginator: { ...resp.paginator },
                    message: msg
                }

                resolve(_resp);

            })

            /*

            await paginate<T>(Model, args.options ).then(resp => {

                let msg: _responseMessage_I[] = [];
                let _resp: _response_I<T[]> = {} as _response_I<T[]>;

                if (resp.items.length === 0) {

                    msg.push({
                        text: 'No se han encontrado resultados',
                        type: 'global'
                    });

                         _resp = {
                    ok: true,
                    statusCode: 404,
                    data: [],
                    paginator: null,
                    message: msg
                }

                resolve(_resp);

                }

                _resp = {
                    ok: true,
                    statusCode: 200,
                    data: [...resp.items],
                    paginator: {
                        meta: { ...resp.meta },
                        links: { ...resp.links }
                    },
                    message: msg
                }

                resolve(_resp);

            }, err => {

                let _resp: _response_I<T[]> = {
                    ok: false,
                    statusCode: 400,
                    data: [],
                    err: err,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        }
                    ]
                }
                // throw new HttpException(_resp, _resp.statusCode);
                reject(_resp);

            })
        */

        })


    }

    async process_getAll<T>(Model: Repository<T>, args: _argsFind): Promise<_response_I<T[]>> {

        return new Promise(async (resolve, reject) => {


            await Model.find(
                {
                    where: args.findObject.where,
                    relations: args.findObject.relations,
                    select: args.findObject.select as any
                }
            ).then(resp => {

                let msg: _responseMessage_I[] = [];
                let _resp: _response_I<T[]> = {} as _response_I<T[]>;

                if (resp.length === 0) {

                    msg.push({
                        text: 'No se han encontrado resultados',
                        type: 'global'
                    });

                    _resp = {
                        ok: true,
                        statusCode: 404,
                        data: [],
                        message: msg
                    }
                    resolve(_resp)
                }

                _resp = {
                    ok: true,
                    statusCode: 200,
                    data: [...resp],
                    message: msg
                }

                resolve(_resp)

            }, err => {

                let _resp: _response_I<T[]> = {
                    ok: false,
                    statusCode: 400,
                    data: [],
                    err: err,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        }
                    ]
                }
                reject(_resp);

            })


        })

    }

    // generarObjeto(obj) {
    //     const resultado = {};
    //     for (const [clave, valor] of Object.entries(obj)) {
    //         resultado[clave] = { contains: valor };
    //     }
    //     return resultado;
    //     //   return JSON.stringify(resultado);
    // }

    // async _populate<T>(documents: T, args: _argsFind){

    //     return new Promise( async (resolve, reject) => {

    //         let aux: T = await this._dynamooseHelpers.populate(documents, args.populate);

    //         resolve(aux);

    //     });

    // }

    async process_getOne<T>(Model: Repository<T>, args: _argsFind): Promise<_response_I<T>> {

        return new Promise(async (resolve, reject) => {


            await Model.findOne(
                {
                    where: args.findObject.where,
                    relations: args.findObject.relations,
                    select: args.findObject.select as any
                }
            ).then((resp) => {

                let msg: _responseMessage_I[] = [];
                let _resp: _response_I<T> = {} as _response_I<T>;

                if (!resp || resp === null) {

                    msg.push({
                        text: 'No se han encontrado resultados',
                        type: 'global'
                    });
                    _resp = {
                        ok: true,
                        statusCode: 404,
                        data: { ...resp },
                        message: msg
                    }

                    resolve(_resp);

                } else {

                    _resp = {
                        ok: true,
                        statusCode: 200,
                        data: { ...resp },
                        message: msg
                    }

                }
                resolve(_resp)

            }).catch((err) => {

                let _resp: _response_I<T[]> = {
                    ok: false,
                    statusCode: 400,
                    data: [],
                    err: err,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        }
                    ]
                }
                // throw new HttpException(_resp, _resp.statusCode);
                reject(_resp);

            });


        })

    }

    /*
        async process_updateOne<T, I>(Model: Model<T, any>, args: _argsUpdate<T>): Promise<_response_I<T>> {

            return new Promise((resolve, reject) => {

                // {"breed": {"contains": "Terrier"} }

                Model.update(args.findObject, args.set).then(resp => {

                    let _resp: _response_I<T> = {
                        ok: true,
                        statusCode: 200,
                        data: resp,
                    }
                    resolve(_resp)

                }, err => {

                    console.log('err', err);

                    let _resp: _response_I<T> = {
                        ok: false,
                        statusCode: 400,
                        data: null,
                        err: err,
                        message: [
                            {
                                text: 'Algo ha salido mal, intente más tarde',
                                type: 'global'
                            }
                        ]
                    }
                    reject(_resp);

                })

            })

        }

    */

    async reconvert_format_populate<T>(format: Reformat_Populate_I, model: any): Promise<T> {

        return new Promise((resolve, reject) => {

            let aux_param: any = structuredClone(model[format.param]);

            let aux_model: any = structuredClone(model);

            let aux_select: any = _.pick(aux_param, format.select.split(' '));


            aux_model[format.to] = aux_select;

            // delete aux_model[format.param]
            // delete aux_model[format.param];

            // console.log('aux_model', aux_model);
            resolve(aux_model);

        })

    }


}
