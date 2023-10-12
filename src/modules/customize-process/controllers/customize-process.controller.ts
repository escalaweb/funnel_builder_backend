import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CustomizeProcessService } from '../services/customize-process.service';
import { CreateCustomizeProcessDto } from '../dto/create-customize-process.dto';
import { UpdateCustomizeProcessDto } from '../dto/update-customize-process.dto';
import { Rel_CustomizeProcess_Funnels_Library_Users_Service } from '../rel-modules/rel-customizeProcess_funnels_library_users.service';
import { AuthPayload_I } from '../../auth/interfaces';
import { Auth } from '../../auth/decorators';
import { ADM_CODE } from '../../../common/constants';

@Controller('customize-process')
export class CustomizeProcessController {

    constructor(
        private readonly customizeProcessService: CustomizeProcessService,
        private readonly _Rel_CustomizeProcess_Funnels_Library_Users_Service: Rel_CustomizeProcess_Funnels_Library_Users_Service
    ) { }

    @Post()
    @Auth()
    create(@Body() createCustomizeProcessDto: any, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        // return this.customizeProcessService.create(createCustomizeProcessDto);
        return this._Rel_CustomizeProcess_Funnels_Library_Users_Service.create_customizeProcess(createCustomizeProcessDto, user);

    }

    @Get('adm/initial/:email')
    @Auth()
    get_initial_customizeProcess_byEmail( @Request() req: any, @Param('email') email: string ) {

        const admCode = req.headers['adm-code'] || null;
        const x_api_key = req.headers['x-api-key'] || null;

        if(admCode && admCode === ADM_CODE && x_api_key != null){

            return this._Rel_CustomizeProcess_Funnels_Library_Users_Service.adrm_get_initial_customize_byEmail(email);

        }else {

            return 'Unauthorized'

        }


    }




    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.customizeProcessService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateCustomizeProcessDto: UpdateCustomizeProcessDto) {
    //     return this.customizeProcessService.update(+id, updateCustomizeProcessDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.customizeProcessService.remove(+id);
    // }

}
