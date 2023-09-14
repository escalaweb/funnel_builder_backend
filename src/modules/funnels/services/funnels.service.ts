import { HttpException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";
import { FunnelBody_et } from "../entities";
import { _argsFind, _response_I } from "../../../common/interfaces";
import { FunnelLibraryService } from "../../funnel-library/services/funnel-library.service";
import { AuthPayload_I } from "../../auth/interfaces";
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { UsersService } from "../../users/services/users.service";



@Injectable()
export class FunnelsService {


    constructor(

        @InjectRepository(FunnelBody_et)
        private readonly _FunnelBody_et_repository: Repository<FunnelBody_et>,

        // @InjectRepository(FunnelLibrary_et)
        // private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        // private readonly _FunnelLibraryService: FunnelLibraryService,



        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

    ) {

    }

    // async create(data: any[], user: AuthPayload_I): Promise<_response_I<FunnelLibrary_et>> {

    //     let _Response: _response_I<FunnelLibrary_et>;

    //     let funnelLibrary_id: FunnelLibrary_et;

    //     // console.log('entra aqui');

    //     // const User_et =

    //     funnelLibrary_id = (await this._FunnelLibraryService.findAll(1, user).then()).data[0] || null;
    //     // funnelLibrary_id = await this._FunnelLibrary_et_repository.preload({
    //     //       user_id: { _id: user._id },
    //     //     name: 'Carpeta de embudo',
    //     // })


    //     if(funnelLibrary_id === null){

    //         funnelLibrary_id = await this._FunnelLibrary_et_repository.create({
    //             name: 'Carpeta de embudo',
    //             user_id: { _id: user._id },
    //             funnels_id: [],

    //         })


    //     }else{



    //     }


    //     console.log('funnelLibrary_id', funnelLibrary_id);

    //     /*
    //     funnelLibrary_id.funnels_id = data.map( funnel => {
    //         return this._FunnelBody_et_repository.create({
    //             funnelLibrary_id: funnelLibrary_id,
    //             stages: funnel.stages.map( stage => {
    //                 stage.funnel_id = funnel;
    //                 return stage;
    //              })
    //         })
    //     }),
    //     */

    //     // for (const [_i, _item] of data.entries()) {

    //     // if (funnelLibrary_id.length > 0) {

    //     //     _item.funnelLibrary_id = funnelLibrary_id[0]._id;

    //     // } else {

    //     //     _item.funnelLibrary_id = (await this._FunnelLibraryService.create({
    //     //         name: 'Carpeta de embudo',
    //     //     }, user).then()).data._id;

    //     // }

    //     // for (const [i, item] of _item.stages.entries()) {

    //     //     item.funnel_id = _item._id;

    //     // }

    //     // }

    //     return ;

    //     await this._processData.process_create<FunnelLibrary_et>(this._FunnelLibrary_et_repository, funnelLibrary_id).then(response => {

    //         _Response = response;

    //         _Response.message = [
    //             {
    //                 text: 'Datos de usuario guardados',
    //                 type: 'global'
    //             }
    //         ]

    //     }, err => {
    //         _Response = err;
    //         console.log('err', err);
    //         throw new HttpException(_Response, _Response.statusCode);
    //     })

    //     return _Response;

    // }



    async update(_id: string, data: any, user: AuthPayload_I): Promise<_response_I<FunnelBody_et>> {

        let _Response: _response_I<FunnelBody_et>;

        await this._processData.process_update<FunnelBody_et>(this._FunnelBody_et_repository, _id , data).then(response => {

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

    async findAll(user: AuthPayload_I): Promise<_response_I<FunnelBody_et[]>> {

        let _Response: _response_I<FunnelBody_et[]>;

        let args: _argsFind = {
            findObject: {
                where: {
                    // "user_id._id": user._id
                    // user_id: user._id
                },
                relations: ['funnelLibrary_id', 'stages'],
                select: {

                }

            },

        }

        await this._processData.process_getAll<FunnelBody_et>(this._FunnelBody_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);

        }).catch((err) => {
            _Response = err;

            throw new HttpException(_Response, _Response.statusCode);
        });

        return _Response;

    }

      async findOne(_id: string, user: AuthPayload_I): Promise<_response_I<FunnelBody_et>> {

        let _Response: _response_I<FunnelBody_et>;

        let args: _argsFind = {
            findObject: {
                where: {
                    _id: _id,

                },
                relations: ['stages'],
                select: {

                }

            },
        }

        await this._processData.process_getOne<FunnelBody_et>(this._FunnelBody_et_repository, args).then(async (resp) => {

            _Response = structuredClone(resp);
            // let aux_resp = structuredClone(resp);


        }).catch((err) => {

            let _Response: _response_I<any> = {
                ok: false,
                statusCode: 404,
                data: null,
                err: err,
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





    /*

    constructor(
        @InjectModel('Funnels')
        private funnels_model: Model<FunnelBody_I, schemaKey_I>,

        @InjectModel('FunnelLibrary')
        private FunnelLibrary_Model: Model<FunnelLibrary_I, schemaKey_I>,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,
        private readonly _funnelLibraryService: FunnelLibraryService
    ) {

        ModelRegistry.register("Funnels", this.funnels_model);

    }

    async create(createFunnelDto: CreateFunnelDto[], funnelLibrary_id: string, user: AuthPayload_I): Promise<_response_I<FunnelLibrary_I>> {
        let _Response: _response_I<FunnelLibrary_I>;

        let _funnelsResponse: _response_I<FunnelBody_I[]>;

        let aux_funnelLibrary: FunnelLibrary_I = await this._funnelLibraryService.findOne(funnelLibrary_id, user).then(response => {

            return response.data;
        });

        console.log('funnelLibrary_id', funnelLibrary_id);


        await this._processData.process_create_many<FunnelBody_I, schemaKey_I>(this.funnels_model, createFunnelDto).then(response => {

            _funnelsResponse = response;

            console.log('responseeee ', _funnelsResponse);
        }, err => {

            let _Response: _response_I<any> = {
                ok: false,
                statusCode: 400,
                data: null,
                err: err,
                message: [
                    {
                        text: 'El id o termino especificado, no es válido',
                        type: 'global'
                    }
                ]
            }

            throw new HttpException(_Response, _Response.statusCode);


        })

        const funnels_ids: string[] = _funnelsResponse.data.map(funnel => {
            return funnel._id['S'];
        });

        aux_funnelLibrary.funnels = aux_funnelLibrary.funnels.concat(funnels_ids);
        aux_funnelLibrary.user_id = aux_funnelLibrary.user_id['_id'];

        delete aux_funnelLibrary._id

        await this._funnelLibraryService.update(funnelLibrary_id, aux_funnelLibrary, user).then(response => {

            _Response = response;

            _Response.message = [
                {
                    text: 'Embudo creado exitosamente',
                    type: 'global'
                }
            ];

        });

        return _Response
    }

    async findAll(funnelLibrary_id: string, user: AuthPayload_I): Promise<_response_I<FunnelBody_I[]>> {
        // return `This action returns all funnels`;

        let _Response: _response_I<FunnelBody_I[]>;

        await this._funnelLibraryService.findOne(funnelLibrary_id, user).then(response => {

            let aux_data: any[] = [...response.data.funnels];


            _Response = {
                ...response,
                data: [...aux_data] as FunnelBody_I[]
            }

        });

        return _Response;

    }

    async findOne(funnelLibrary_id: string, funnel_id: string , user: AuthPayload_I): Promise<_response_I<FunnelBody_I>> {
        // return `This action returns all funnels`;

        let _Response: _response_I<FunnelBody_I>;

        let _funnelLibrary: FunnelBody_I[] = await this.findAll(funnelLibrary_id, user).then(response => {
            return response.data;
        })

        let aux_funnel: FunnelBody_I = await _funnelLibrary.find(funnel => {
            return funnel._id === funnel_id;
        });

        if(!aux_funnel){
            let _Response: _response_I<any> = {
                ok: false,
                statusCode: 404,
                data: null,
                message: [
                    {
                        text: 'El id o termino especificado, no es válido',
                        type: 'global'
                    }
                ]
            }

            throw new HttpException(_Response, _Response.statusCode);
        }else{
            _Response = {
                ok: true,
                statusCode: 200,
                data: aux_funnel,
                message: [
                    {
                        text: 'Embudo encontrado exitosamente',
                        type: 'global'
                    }
                ]
            }
        }

        return _Response;

    }

    // update(id: number, updateFunnelDto: UpdateFunnelDto) {
    //     return `This action updates a #${id} funnel`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} funnel`;
    // }

    */
}
