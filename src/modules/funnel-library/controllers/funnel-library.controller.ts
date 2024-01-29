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

     @Get('initial/shared_me/:funnelLibrary_id/:archive_id')
    find_initialBy_library_sharedMe(@Request() req: any, @Param('funnelLibrary_id', ParseUUIDPipe) funnelLibrary_id: string, @Param('archive_id', ParseUUIDPipe) archive_id: string) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.find_initialBy_library_sharedMe(funnelLibrary_id, archive_id, user);
    }

    @Get('initial/:funnelLibrary_id/:archive_id')
    find_initialBy_libraryId(@Request() req: any, @Param('funnelLibrary_id', ParseUUIDPipe) funnelLibrary_id: string, @Param('archive_id', ParseUUIDPipe) archive_id: string) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.find_initialBy_libraryId(funnelLibrary_id, archive_id, user);
    }

    @Post()
    create(@Body() createFunnelLibraryDto: CreateFunnelLibraryDto, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.create_folder(createFunnelLibraryDto, user);
    }

    @Post(":funnelLibrary_id/:archive_id")
    save_single_folderState(@Body() body: any,@Param('funnelLibrary_id', ParseUUIDPipe) funnelLibrary_id: string, @Param('archive_id', ParseUUIDPipe) archive_id: string, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.save_single_folderState(funnelLibrary_id, archive_id, body, user);
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
