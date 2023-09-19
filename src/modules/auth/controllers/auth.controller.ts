import { Controller, Post, Body, Get } from "@nestjs/common";


import { Auth } from "../decorators";
import { _response_I } from "../../../common/interfaces";
import { _Configuration_Keys } from "../../../config/config.keys";
import { ConfigProjectService } from "../../../config/config.service";
import { ConfigService } from "@nestjs/config";
import { getConnection } from "typeorm";

// @ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor() {

    }

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

    /*
    @Post('envs')
    @Auth()
    async envs() {

        const _config = new ConfigProjectService();
        let envs = {
            // host: _config._get(_Configuration_Keys.DB_HOST),
            PORT: _config._get(_Configuration_Keys.PORT),
            LOG_LEVEL: _config._get(_Configuration_Keys.LOG_LEVEL),
            ENVIROMENT: _config._get(_Configuration_Keys.ENVIROMENT),

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

    */


    // @Get('status')
    // async checkDatabaseConnection() {
    //     try {
    //         const connection = getConnection(); // Esto asume que tienes una única conexión en tu aplicación

    //         if (connection.isConnected) {
    //             return { status: 'connected' };
    //         } else {
    //             return { status: 'disconnected' };
    //         }
    //     } catch (error) {
    //         return { status: 'error', error: error.message };
    //     }
    // }


}
