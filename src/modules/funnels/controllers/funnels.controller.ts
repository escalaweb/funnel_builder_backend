import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { FunnelsService } from '../services/funnels.service';
import { CreateFunnelDto } from '../dto/create-funnel.dto';
import { UpdateFunnelDto } from '../dto/update-funnel.dto';
import { Auth } from '../../auth/decorators';
import { AuthPayload_I } from '../../auth/interfaces/_jwt-payload.interface';
import { Rel_Funnels_Planner_Library_Users_Service } from '../rel-modules/rel-funnels_planner_library_users.service';

@Controller('funnels')
export class FunnelsController {

    constructor(
        private readonly funnelsService: FunnelsService,
        private readonly _Rel_Funnels_Planner_Library_Users_Service: Rel_Funnels_Planner_Library_Users_Service
    ) { }


    @Post()
    @Auth()
    create(@Body() createFunnelDto: any[], @Request() req: any) {

        const user: AuthPayload_I = req.user;
        return this._Rel_Funnels_Planner_Library_Users_Service.create_funnels(createFunnelDto, user);

    }

    @Get('all')
    @Auth()
    findAll( @Param('id') id: string, @Request() req: any ) {
        const user: AuthPayload_I = req.user;
        return this.funnelsService.findAll( user );
    }

    @Get('initial')
    @Auth()
    get_initial_funnel(@Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this._Rel_Funnels_Planner_Library_Users_Service.get_initial_funnel(user);
    }

    // @Get('all/:id')
    // @Auth()
    // findAll_byLibrary( @Param('id') id: string, @Request() req: any ) {
    //     return null;
    //     // return this.funnelsService.findAll( id, req.user );
    // }

    @Get(':funnel_id')
    @Auth()
    findOne( @Param('funnel_id') funnel_id: string, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelsService.findOne(funnel_id, user);
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
