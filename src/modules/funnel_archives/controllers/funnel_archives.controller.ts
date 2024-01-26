import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseUUIDPipe, Put } from '@nestjs/common';
import { FunnelArchivesService } from '../services/funnel_archives.service';
import { CreateFunnelArchiveDto } from '../dto/create-funnel_archive.dto';
import { UpdateFunnelArchiveDto } from '../dto/update-funnel_archive.dto';
import { Auth } from '../../auth/decorators';

import { AuthPayload_I } from '../../auth/interfaces';

@Controller('funnel-archives')
@Auth()
export class FunnelArchivesController {
    constructor(private readonly funnelArchivesService: FunnelArchivesService) { }

    @Post('create/:funnelLibrary_id')
    async create(@Body() createFunnelArchiveDto: any, @Param('funnelLibrary_id') funnelLibrary_id: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        return await this.funnelArchivesService.create_archive({
            ...createFunnelArchiveDto,
            funnelLibrary_id
        }, user);
    }

    @Post('clone/:funnelLibrary_id/:funnel_archive')
    async clone(@Param('funnelLibrary_id') funnelLibrary_id: string, @Param('funnel_archive') funnel_archive: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;
       return await this.funnelArchivesService.clone(funnelLibrary_id, funnel_archive, user);

    }

    // @Get()
    // findAll() {
    //     return this.funnelArchivesService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.funnelArchivesService.findOne(+id);
    // }

    @Put(':funnelLibrary_id/:funnel_archive')
    async update(@Param('funnelLibrary_id') funnelLibrary_id: string, @Param('funnel_archive') funnel_archive: string, @Body() body: any, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return await this.funnelArchivesService.update(funnelLibrary_id, funnel_archive, body, user);
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.funnelArchivesService.remove(+id);
    // }
}
