import { Controller, Post, Body, Get } from "@nestjs/common";


import { Auth } from "../decorators";
import { _response_I } from "../../../common/interfaces";
import { _Configuration_Keys } from "../../../config/config.keys";
import { ConfigProjectService } from "../../../config/config.service";
import { ConfigService } from "@nestjs/config";

// @ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(

    ) { }

    @Get()
    @Auth()
    async registerUser() {

         let _Response: _response_I<any> = {
            ok: true,
            data: 'Hola mundo',
            message: [
                {
                    text: 'Prueba exitosa',
                    type: 'global'
                }
            ],
            statusCode: 200,

         };
       return _Response;

    }

    @Get('envs')
    // @Auth()
    async envs() {

        const _config = new ConfigProjectService(new ConfigService());
        let envs = {
            host: _config._get(_Configuration_Keys.DB_HOST),
        port: Number(_config._get(_Configuration_Keys.DB_PORT)),
        database: _config._get(_Configuration_Keys.DB_NAME),
        username: _config._get(_Configuration_Keys.DB_USERNAME),
        password: _config._get(_Configuration_Keys.DB_PASSWORD),
        }

         let _Response: _response_I<any> = {
            ok: true,
            data: {
                ...envs
            },
            message: [
                {
                    text: 'prueba envs',
                    type: 'global'
                }
            ],
            statusCode: 200,

         };
       return _Response;

    }


}
