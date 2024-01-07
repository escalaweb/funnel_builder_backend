import { Controller, Get, Param, Request, Body, Post } from '@nestjs/common';
import { LibraryPermisionsService } from '../services/library-permisions.service';
import { AuthPayload_I } from '../../auth/interfaces';
import { Auth } from '../../auth/decorators';

@Controller('library-permisions')
@Auth()
export class LibraryPermisionsController {
    constructor(
        private readonly libraryPermisionsService: LibraryPermisionsService
    ) { }

    @Get(':libraryPermision_id')
    async findOne_byId(@Param('libraryPermision_id') libraryPermision_id: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        let resp = await this.libraryPermisionsService.findOne_byId(libraryPermision_id, user);
        return resp;

    }

    @Get('/byLibrary/:funnelLibrary_id')
    async findOne_byLibraryId(@Param('funnelLibrary_id') funnelLibrary_id: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        return await this.libraryPermisionsService.findAll_byLibraryId(funnelLibrary_id, user);

    }

    @Post('setPermisions/:funnelLibrary_id')
    async setPermisions_toLibrary(@Body() libraryPermisions: any, @Param('funnelLibrary_id') funnelLibrary_id: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        const token: string = req.headers.authorization.replace('Bearer ', '');
        return await this.libraryPermisionsService.createPermisions_toLibrary(libraryPermisions, funnelLibrary_id, user, token);

     }


}
