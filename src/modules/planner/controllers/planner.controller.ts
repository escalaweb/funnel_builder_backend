import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { PlannerService } from '../services/planner.service';
import { Auth } from '../../auth/decorators';
import { AuthPayload_I } from '../../auth/interfaces';

@Controller('planner')
export class PlannerController {
    constructor(
        private readonly plannerService: PlannerService,
    ) { }

    @Post()
    @Auth()
    create(@Body() createPlannerDto: any, @Request() req: any) {

        const user: AuthPayload_I = req.user;

        return this.plannerService.create_configsPlanner(createPlannerDto, user);

    }


    @Get()
    @Auth()
    findAll(@Request() req: any) {

        const user: AuthPayload_I = req.user;
        // return this.plannerService.findAll();

    }

    @Get(':id')
    @Auth()
    findOne(@Param('id') id: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;

    }


}
