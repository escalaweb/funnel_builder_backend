import { Injectable } from "@nestjs/common";



@Injectable()
export class FunnelLibraryService {


    /*

    constructor(
        @InjectModel('FunnelLibrary')
        private FunnelLibrary_Model: Model<FunnelLibrary_I, schemaKey_I>,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService
    ) {
        ModelRegistry.register("FunnelLibrary", this.FunnelLibrary_Model);
    }

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
