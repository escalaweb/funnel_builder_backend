import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { PermisionsRequestsService } from '../services/permisions-requests.service';
import { CreatePermisionsRequestDto } from '../dto/create-permisions-request.dto';
import { UpdatePermisionsRequestDto } from '../dto/update-permisions-request.dto';
import { AuthPayload_I } from '../../auth/interfaces';
import { Auth } from '../../auth/decorators';

@Controller('permisions-requests')
@Auth()
export class PermisionsRequestsController {

    constructor(
        private readonly permisionsRequestsService: PermisionsRequestsService
    ) { }

    @Post()
    create(@Body() body: CreatePermisionsRequestDto, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.permisionsRequestsService.create(body, user);
    }

    @Get(':funnel_library')
    findAll(@Param('funnel_library') funnel_library: string, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.permisionsRequestsService.findAll(funnel_library, user);
    }

    // @Get(':funnel_library')
    // findOne(@Param('funnel_library') funnel_library: string) {

    // }

    @Put(':permision_request')
    update(@Param('permision_request') permision_request: string, @Body() updatePermisionsRequestDto: UpdatePermisionsRequestDto, @Request() req: any) {
            const user: AuthPayload_I = req.user;
        return this.permisionsRequestsService.update(permision_request, updatePermisionsRequestDto, user);
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.permisionsRequestsService.remove(+id);
    // }

}
