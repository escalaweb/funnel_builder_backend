import { Controller, Post, Body, Get, Param, Request, Put, ParseUUIDPipe } from "@nestjs/common";
import { CreateFunnelLibraryDto } from "../dto/create-funnel-library.dto";
import { FunnelLibraryService } from "../services/funnel-library.service";
import { Auth } from "../../auth/decorators";

import { AuthPayload_I } from "../../auth/interfaces/_jwt-payload.interface";


@Controller('funnel-library')
@Auth()
export class FunnelLibraryController {

    constructor(
        private readonly funnelLibraryService: FunnelLibraryService
    ) {

    }

    @Post()
    create(@Body() createFunnelLibraryDto: CreateFunnelLibraryDto, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.create(createFunnelLibraryDto, user);

    }

    @Get()
    findAll(@Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.find(1, user);
    }

    @Get('shared_me')
    findShareWithMe(@Request() req: any) {

        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.findShareWithMe( user );

    }

    @Get('initial/shared_me/:funnelLibrary_id')
    find_initialBy_library_sharedMe(@Request() req: any, @Param('funnelLibrary_id', ParseUUIDPipe) funnelLibrary_id: string) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.find_initialBy_library_sharedMe(funnelLibrary_id, user);
    }

    @Get('initial/:funnelLibrary_id')
    find_initialBy_libraryId(@Request() req: any, @Param('funnelLibrary_id', ParseUUIDPipe) funnelLibrary_id: string) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.find_initialBy_libraryId(funnelLibrary_id, user);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.findOne(id, user);
    }

    @Put(':id')
    update(@Param('id',) id: string, @Body() updateFunnelLibraryDto: any, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.update(id, updateFunnelLibraryDto, user);
    }

}
