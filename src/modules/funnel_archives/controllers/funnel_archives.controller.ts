import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { FunnelArchivesService } from '../services/funnel_archives.service';
import { CreateFunnelArchiveDto } from '../dto/create-funnel_archive.dto';
import { UpdateFunnelArchiveDto } from '../dto/update-funnel_archive.dto';
import { Auth } from '../../auth/decorators';

import { AuthPayload_I } from '../../auth/interfaces';

@Controller('funnel-archives')
@Auth()
export class FunnelArchivesController {
    constructor(private readonly funnelArchivesService: FunnelArchivesService) { }

    @Post()
    create(@Body() createFunnelArchiveDto: CreateFunnelArchiveDto, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelArchivesService.create(createFunnelArchiveDto, user);
    }

    @Get()
    findAll() {
        return this.funnelArchivesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.funnelArchivesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFunnelArchiveDto: UpdateFunnelArchiveDto) {
        return this.funnelArchivesService.update(+id, updateFunnelArchiveDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.funnelArchivesService.remove(+id);
    }
}
