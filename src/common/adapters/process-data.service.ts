
import { Injectable } from '@nestjs/common';
import { _argsUpdate } from '../interfaces/responseUpdate.interface';
import { Repository } from 'typeorm';
import { _argsPagination, _paginateByArray_I } from '../interfaces/_responsePaginator.interface';
import { Pagination } from 'nestjs-typeorm-paginate';

import * as _ from 'lodash';
import { _Populate_I, _ProcessData_Model_I, _argsFindMany_I, _argsFind_I, _responseMessage_I, _response_I } from '../interfaces';



interface AnyObj {
    [key: string]: any;
}

@Injectable()
export class ProcessDataService {

    constructor(
    ) {
    }

    populateData(data: AnyObj, populateOptions: _Populate_I, isRoot: boolean = true): Promise<AnyObj> {
        return new Promise((resolve) => {
            const processObject = (obj: AnyObj, options: _Populate_I, isRoot: boolean): AnyObj => {
                let resultObj = isRoot ? { ...obj } : {};

                for (const [key, value] of Object.entries(options)) {
                    if (obj.hasOwnProperty(key)) {
                        const select = Array.isArray(value.select) ? value.select : [value.select];
                        const isExcluding = select.some(selectKey => selectKey.startsWith('-'));

                        if (isExcluding) {
                            // Exclusión en arrays
                            if (Array.isArray(obj[key])) {
                                resultObj[key] = obj[key].map(item => {
                                    const itemCopy = { ...item };
                                    select.forEach(selectKey => {
                                        if (selectKey.startsWith('-')) {
                                            delete itemCopy[selectKey.substring(1)];
                                        }
                                    });
                                    return itemCopy;
                                });
                            } else {
                                // Exclusión en objetos
                                resultObj[key] = { ...obj[key] };
                                select.forEach(selectKey => {
                                    if (selectKey.startsWith('-')) {
                                        delete resultObj[key][selectKey.substring(1)];
                                    }
                                });
                            }
                        } else {
                            // Inclusión de campos específicos
                            if (Array.isArray(obj[key])) {
                                resultObj[key] = obj[key].map(item => {
                                    return select.reduce((acc, curr) => {
                                        if (item.hasOwnProperty(curr)) {
                                            acc[curr] = item[curr];
                                        }
                                        return acc;
                                    }, {});
                                });
                            } else {
                                resultObj[key] = select.reduce((acc, curr) => {
                                    if (obj[key].hasOwnProperty(curr)) {
                                        acc[curr] = obj[key][curr];
                                    }
                                    return acc;
                                }, {});
                            }
                        }

                        // Aplicación recursiva para sub-relaciones
                        if (value.populate && typeof obj[key] === 'object') {
                            resultObj[key] = Array.isArray(obj[key])
                                ? obj[key].map((item: AnyObj) => this.populateData(item, value.populate!, false))
                                : this.populateData(obj[key], value.populate!, false);
                        }
                    }
                }

                return resultObj;
            };

            resolve(processObject(data, populateOptions, true));
        });
    }


    async process_delete<T>(process: _ProcessData_Model_I<T>): Promise<_response_I<T>> {

        return new Promise(async (resolve, reject) => {

            // await Model.delete({ ...args.findObject.where as any }).then(resp => {
            await process.queryRunner.manager.delete(process.entity as any, process.body).then(resp => {

                let _resp: _response_I<T> = {
                    ok: true,
                    statusCode: 200,
                    data: resp.raw,
                    message: [
                        {
                            text: 'Removido correctamente',
                            type: 'global'
                        }
                    ]
                }
                resolve(_resp)

            }).catch(err => {

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

    async process_createMany<T>(process: _ProcessData_Model_I<T>): Promise<_response_I<T[]>> {

        return new Promise(async (resolve, reject) => {

            let _Response: _response_I<T[]>


            try {

                let processSaved: T[] = [];

                for (const [i, item] of process.bodyMany.entries()) {

                    await process.queryRunner.manager.save(process.entity, process.body).then(async (resp) => {

                        processSaved.push(resp as T);

                    })

                    _Response = {
                        ok: true,
                        statusCode: 201,
                        data: processSaved,
                    }

                }

                resolve(_Response);

            } catch (error) {

                _Response = {
                    ok: false,
                    statusCode: 400,
                    data: process.bodyMany,
                    err: error,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        },
                        {
                            text: 'Context [ProcessDataService - process_create]',
                            type: 'context'
                        }
                    ]
                }

                reject(_Response);

            }
        })

    }

    async process_create<T>(process: _ProcessData_Model_I): Promise<_response_I<T>> {

        return new Promise(async (resolve, reject) => {

            let _resp: _response_I<T>

            await process.queryRunner.manager.save(process.entity, process.body).then(async (resp) => {

                _resp = {
                    ok: true,
                    statusCode: 201,
                    data: resp as T,
                }

                resolve(_resp);

            }).catch(error => {
                _resp = {
                    ok: false,
                    statusCode: 400,
                    data: process.body,
                    err: error,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        },
                        {
                            text: 'Context [ProcessDataService - process_create]',
                            type: 'context'
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

    async process_getAll_paginate_array<T>(Model: T[], args: _argsFindMany_I): Promise<_paginateByArray_I<T>> {

        return new Promise(async (resolve, reject) => {

            let { limit, page } = args.options

            limit = Number(limit);
            page = Number(page);

            const objectsArray: any[] = Model;
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
    async process_getAll_paginate<T>(process: _ProcessData_Model_I): Promise<_response_I<T[]>> {

        return new Promise(async (resolve, reject) => {

            let msg: _responseMessage_I[] = [];
            let elements: T[] = [];
            let _resp: _response_I<T[]> = {} as _response_I<T[]>;



            await this.process_getAll<T>({
                entity: process.entity,
                argsFindMany: process.argsFindMany,
                queryRunner: process.queryRunner,
            }).then((resp) => {

                elements = resp.data;

            }, (err) => {

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

            await this.process_getAll_paginate_array<T>(elements, process.argsFindMany).then(resp => {

                _resp = {
                    ok: true,
                    statusCode: 200,
                    data: [...resp.data],
                    paginator: { ...resp.paginator },
                    message: msg
                }

                resolve(_resp);

            })

        })

    }
    async process_getAll<T>(process: _ProcessData_Model_I): Promise<_response_I<T[]>> {

        return new Promise(async (resolve, reject) => {

            await process.queryRunner.manager.find(process.entity, { ...process.argsFindMany.findObject as any }).then((resp: T[]) => {

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
                    resolve(_resp);
                }

                _resp = {
                    ok: true,
                    statusCode: 200,
                    data: [...resp],
                    message: msg
                }

                resolve(_resp);

            }).catch((err) => {

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

            });

        })

    }

    // async process_getOne<T>(Model: Repository<T>, args: _argsFind_I): Promise<_response_I<T>> {
    async process_getOne<T>(process: _ProcessData_Model_I): Promise<_response_I<T>> {

        return new Promise(async (resolve, reject) => {

            await process.queryRunner.manager.findOne(process.entity, { ...process.argsFind.findObject }).then(async (resp: T) => {

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
                        message: msg,
                        data: null,
                    }

                    resolve(_resp);

                } else {

                    if (process.argsFind.populate) {
                        resp = await this.populateData(resp, process.argsFind.populate) as T;
                    }

                    _resp = {
                        ok: true,
                        statusCode: 200,
                        message: msg,
                        data: { ...resp }
                    }

                }
                resolve(_resp)

            }).catch((err) => {

                let _resp: _response_I<T> = {
                    ok: false,
                    statusCode: 400,
                    err: err,
                    message: [
                        {
                            text: 'Algo ha salido mal, intente más tarde',
                            type: 'global'
                        }
                    ],
                    data: null,
                }
                reject(_resp);

            });

        })

    }


}
