import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { FunnelsService } from '../services/funnels.service';
import { Auth } from '../../auth/decorators';
import { AuthPayload_I } from '../../auth/interfaces/_jwt-payload.interface';
import { ADM_CODE } from '../../../common/constants';


@Controller('funnels')
@Auth()
export class FunnelsController {

    constructor(
        private readonly funnelsService: FunnelsService,
    ) { }

    @Post()
    create(@Body() createFunnelDto: any[], @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelsService.create_funnels_v1(createFunnelDto, user);
    }

    @Get('all')
    findAll(@Param('id') id: string, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelsService.findAll(user);
    }

    @Get('initial')
    get_initial_funnel(@Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelsService.get_initial_funnel(user);
    }

    @Get('adm/initial/:email')
    adrm_get_initial_funnel_byEmail(@Request() req: any, @Param('email') email: string) {

        const user: AuthPayload_I = req.user;
        const admCode = req.headers['adm-code'] || null;
        const x_api_key = req.headers['x-api-key'] || null;

        if (user?.email != 'alvaro@escala.com') {

            return 'Unauthorized';
        }

        if (admCode && admCode === ADM_CODE && x_api_key != null) {

            return this.funnelsService.adrm_get_initial_funnel_byEmail(email);

        } else {

            return 'Unauthorized';

        }

    }

    @Get(':funnel_id')
    findOne(@Param('funnel_id') funnel_id: string, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelsService.findOne(funnel_id, user);
    }


}



