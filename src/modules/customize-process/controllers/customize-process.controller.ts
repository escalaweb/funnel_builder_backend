import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CustomizeProcessService } from '../services/customize-process.service';
import { ADM_CODE } from '../../../common/constants';
import { Auth } from '../../auth/decorators';
import { AuthPayload_I } from '../../auth/interfaces';

@Controller('customize-process')
export class CustomizeProcessController {

    constructor(
        private readonly customizeProcessService: CustomizeProcessService,
    ) { }

    @Post()
    @Auth()
    create(@Body() createCustomizeProcessDto: any, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        return this.customizeProcessService.create_customizeProcess(createCustomizeProcessDto, user);

    }

    @Get('adm/initial/:email')
    @Auth()
    get_initial_customizeProcess_byEmail( @Request() req: any, @Param('email') email: string ) {

        const admCode = req.headers['adm-code'] || null;
        const x_api_key = req.headers['x-api-key'] || null;

        if(admCode && admCode === ADM_CODE && x_api_key != null){

            return this.customizeProcessService.adrm_get_initial_customize_byEmail(email);

        }else {

            return 'Unauthorized'

        }


    }




}
