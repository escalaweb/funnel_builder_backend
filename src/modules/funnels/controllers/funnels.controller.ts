import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { FunnelsService } from '../services/funnels.service';
import { CreateFunnelDto } from '../dto/create-funnel.dto';
import { UpdateFunnelDto } from '../dto/update-funnel.dto';
import { Auth } from '../../auth/decorators';
import { AuthPayload_I } from '../../auth/interfaces/_jwt-payload.interface';

@Controller('funnels')
export class FunnelsController {
    constructor(private readonly funnelsService: FunnelsService) { }

    @Post(':id')
    @Auth()
    create(@Body() createFunnelDto: CreateFunnelDto[], @Param('id') id: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        // return this.funnelsService.create(createFunnelDto, id, user);
    }

    @Get('all/:id')
    @Auth()
    findAll( @Param('id') id: string, @Request() req: any ) {
        // return this.funnelsService.findAll( id, req.user );
    }

    @Get(':id/:funnelId')
    @Auth()
    findOne(@Param('id') id: string, @Param('funnelId') funnelId: string, @Request() req: any) {
        // return this.funnelsService.findOne(id, funnelId, req.user);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateFunnelDto: UpdateFunnelDto) {
    //     return this.funnelsService.update(+id, updateFunnelDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.funnelsService.remove(+id);
    // }
}
