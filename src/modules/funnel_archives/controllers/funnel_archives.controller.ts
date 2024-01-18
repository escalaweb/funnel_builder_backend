import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FunnelArchivesService } from '../services/funnel_archives.service';
import { CreateFunnelArchiveDto } from '../dto/create-funnel_archive.dto';
import { UpdateFunnelArchiveDto } from '../dto/update-funnel_archive.dto';

@Controller('funnel-archives')
export class FunnelArchivesController {
  constructor(private readonly funnelArchivesService: FunnelArchivesService) {}

  @Post()
  create(@Body() createFunnelArchiveDto: CreateFunnelArchiveDto) {
    return this.funnelArchivesService.create(createFunnelArchiveDto);
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
