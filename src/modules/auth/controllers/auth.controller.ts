import { Controller, Post, Body, Get } from "@nestjs/common";


import { Auth } from "../decorators";
import { _response_I } from "../../../common/interfaces";

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


}
