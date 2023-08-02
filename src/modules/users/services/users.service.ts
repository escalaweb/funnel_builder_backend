import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { ProcessDataService, DateProcessService } from '../../../common/adapters';
import { _argsFind, _response_I } from '../../../common/interfaces';
import { schemaKey_I } from '../../../common/interfaces/_dynamoose.interface';

import { validate as isUUID } from 'uuid';
import { User_I } from '../interfaces';
import { AuthPayload_I } from '../../auth/interfaces/_jwt-payload.interface';
import * as dynamoose from 'dynamoose';
import { ModelRegistry } from '../../../common/helpers/dynamoose.helper.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('Users')
        private userModel: Model<User_I, schemaKey_I>,

        // @InjectModel('Tests')
        // private testsModel: Model<any, any>,
        // @InjectModel('Tests2')
        // private tests2Model: Model<any, any>,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService
    ) {

        ModelRegistry.register("Users", this.userModel);
     }

     async test(){

//         let _Response: _response_I<any>;

//         await this._processData.process_create<any, any>(this.tests2Model,
//         {
//             "test2id": "999",
//             "book": "book",
//             "user": "1"
//         }
//         ).then(response => {

//             _Response = response;

//             _Response.message = [
//                 {
//                     text: 'Datos de usuario guardados',
//                     type: 'global'
//                 }
//             ]

//         }, err => {
//             _Response = err;
//             throw new HttpException(_Response, _Response.statusCode);
//         })

//         return _Response;

// //     const user = await this.testsModel.get("2" as any); // {"id": 2, "name": "Bob", "parent": 1}
// //     const populatedUser = await user.populate();

// // console.log('aaa', populatedUser);
     }

    async create(createUserDto: User_I): Promise<_response_I<User_I[]>> {

        let _Response: _response_I<User_I[]>;

        await this._processData.process_create<User_I, schemaKey_I>(this.userModel, createUserDto).then(response => {

            _Response = response;

            _Response.message = [
                {
                    text: 'Datos de usuario guardados',
                    type: 'global'
                }
            ]

        }, err => {
            _Response = err;
            throw new HttpException(_Response, _Response.statusCode);
        })

        return _Response;
    }

    // findAll() {
    //     return `This action returns all users`;
    // }

    async findOne(_id: string) : Promise<_response_I<User_I>> {

        if (isUUID(_id)) {

            let _Response: _response_I<User_I>;

            let args: _argsFind = {

                findObject: {
                    cognito_username: _id
                },

            }

            await this._processData.process_getOne<User_I, schemaKey_I>(this.userModel, args).then(response => {

                _Response = response;

                _Response.message = [
                    {
                        text: 'Usuario obtenido',
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

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }


     async findOneByTerm(term: any) : Promise<_response_I<User_I>> {

            let _Response: _response_I<User_I>;

            let args: _argsFind = {
                findObject: {
                    ...term
                }
            }

            await this._processData.process_getOne<User_I, schemaKey_I>(this.userModel, args).then(response => {

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

