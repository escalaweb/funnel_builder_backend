import { Controller, Post, Body } from "@nestjs/common";


import { Auth } from "../decorators";

// @ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(

    ) { }

    @Post()
    @Auth()
    async registerUser() {

       return null;

    }


}
