

/*

import { HttpException, Injectable } from '@nestjs/common';
import { DateProcessService } from '.';
import { _argsFind, _responseMessage_I, _response_I } from '../interfaces';
import { _argsUpdate } from '../interfaces/responseUpdate.interface';

import { Model, TransactionSupport } from 'nestjs-dynamoose';
import { _argsPagination } from '../interfaces/_responsePaginator.interface';

// import * as mongoose from 'mongoose';
import * as dynamoose from 'dynamoose';
import { UserSchema } from '../../modules/users/models/schemas/users.schema';
import { DynamooseHelper } from '../helpers';

@Injectable()
export class ProcessDataService extends TransactionSupport {


    constructor(
        private readonly _dateProcessService: DateProcessService,
        private readonly _dynamooseHelpers: DynamooseHelper,



    ) {

        super();
    }

    async process_create<T, I>(Model: Model<T, I>, body: any): Promise<_response_I<T[]>> {

        return new Promise(async (resolve, reject) => {


            console.log('el modelo', body);
            await Model.create(body).then(async (resp) => {

                let aux = await resp.populate().then(resp => { return resp });

                console.log('aux', aux);

                let _resp: _response_I<T[]> = {
                    ok: true,
                    statusCode: 201,
                    data: [aux],
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
                // throw new HttpException(_resp, _resp.statusCode);
                reject(_resp);

            });

        })

    }
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
                    // .then(async (resp: any) => {

                    //     console.log('que hay en resp', resp);
                    //     // let aux = await resp.populate().then(resp => { return resp });

                    //     _resp.data.push(resp);

                    // }, err => {

                    //     let _resp: _response_I<T[]> = {
                    //         ok: false,
                    //         statusCode: 400,
                    //         data: body,
                    //         err: err,
                    //         message: [
                    //             {
                    //                 text: 'Algo ha salido mal, intente más tarde',
                    //                 type: 'global'
                    //             }
                    //         ]
                    //     }

                    // }))
                )
            }

            await this.transaction(transactionHub).then(resp => {

                //                 transactionHub [
                //   {
                //     Put: {
                //       Item: [Object],
                //       TableName: 'Funnels',
                //       ConditionExpression: 'attribute_not_exists(#__hash_key)',
                //       ExpressionAttributeNames: [Object]
                //     }
                //   },
                //   {
                //     Put: {
                //       Item: [Object],
                //       TableName: 'Funnels',
                //       ConditionExpression: 'attribute_not_exists(#__hash_key)',
                //       ExpressionAttributeNames: [Object]
                //     }
                //   }
                // ]

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


    async process_getAll<T, I>(Model: Model<T, I>, args: _argsPagination<T>): Promise<_response_I<T[]>> {

        return new Promise(async (resolve, reject) => {

            const conditions = this.generarObjeto(args.findObject);

            Model.scan(conditions)
                .exec()
                .then(async (resp: any) => {

                    let _resp: _response_I<T[]> = {
                        ok: true,
                        statusCode: 201,
                        data: [],
                        // data: resp.toJSON(),
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
                    // throw new HttpException(_resp, _resp.statusCode);
                    reject(_resp);

                })

        })

    }

    generarObjeto(obj) {
        const resultado = {};
        for (const [clave, valor] of Object.entries(obj)) {
            resultado[clave] = { contains: valor };
        }
        return resultado;
        //   return JSON.stringify(resultado);
    }

    async _populate<T>(documents: T, args: _argsFind){

        return new Promise( async (resolve, reject) => {

            let aux: T = await this._dynamooseHelpers.populate(documents, args.populate);

            resolve(aux);

        });

    }

    async process_getOne<T, I>(Model: Model<T, I>, args: _argsFind): Promise<_response_I<T>> {

        return new Promise(async (resolve, reject) => {


            // const populateService = new PopulateService();
            // const post = await Model.get({_id: "9aab51cc-39e8-4ade-99c6-cf8f5202266f"} as I);
            // const populatedPost = await this._dynamooseHelpers.populateOne(post, [
            //     { path: "user_id", model: "Users" },
            // ]);

            // console.log('aaa', populatedPost);

            const conditions = this.generarObjeto(args.findObject);

            Model.scan(conditions)
                .exec()
                .then(async (resp: any) => {

                    if (resp.toJSON()[0] === undefined || resp.toJSON()[0] === null) {
                        let _resp: _response_I<T> = {
                            ok: false,
                            statusCode: 404,
                            data: null,
                            message: [
                                {
                                    text: 'No se ha encontrado el recurso solicitado',
                                    type: 'global'
                                }
                            ]
                        }
                        // throw new HttpException(_resp, _resp.statusCode);
                        reject(_resp);
                    }

                    let aux_resp = { ...resp.toJSON()[0] };
                    aux_resp = await this._dynamooseHelpers.populate(resp.toJSON()[0], args.populate);

                    let _resp: _response_I<T> = {
                        ok: true,
                        statusCode: 200,
                        data: aux_resp,
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
                    // throw new HttpException(_resp, _resp.statusCode);
                    reject(_resp);

                })

        })

    }

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




}


*/