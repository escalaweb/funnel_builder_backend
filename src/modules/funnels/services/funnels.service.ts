import { HttpException, Injectable } from '@nestjs/common';
import { CreateFunnelDto } from '../dto/create-funnel.dto';
import { UpdateFunnelDto } from '../dto/update-funnel.dto';
import { InjectModel, Model } from 'nestjs-dynamoose';

import { ProcessDataService, DateProcessService } from '../../../common/adapters';
import { schemaKey_I } from '../../../common/interfaces/_dynamoose.interface';
import { FunnelBody_I } from '../interfaces';
import { FunnelLibrary_I } from '../../funnel-library/interfaces';
import { _response_I } from '../../../common/interfaces';
import { FunnelLibraryService } from '../../funnel-library/services/funnel-library.service';
import { AuthPayload_I } from '../../auth/interfaces/_jwt-payload.interface';
import { ModelRegistry } from '../../../common/helpers/dynamoose.helper.service';

@Injectable()
export class FunnelsService {

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
}
