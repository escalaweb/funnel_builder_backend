import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { PlannerService } from '../services/planner.service';
import { CreatePlannerDto } from '../dto/create-planner.dto';
import { UpdatePlannerDto } from '../dto/update-planner.dto';
import { Auth } from '../../auth/decorators';
import { AuthPayload_I } from '../../auth/interfaces';
import { Rel_Planner_Funnels_Library_Users_Service } from '../rel-modules/rel-planner_funnels_users.service';

@Controller('planner')
export class PlannerController {
    constructor(
        private readonly plannerService: PlannerService,
        private readonly _Rel_Planner_Funnels_Library_Users_Service: Rel_Planner_Funnels_Library_Users_Service
    ) { }

    @Post()
    @Auth()
    create(@Body() createPlannerDto: any, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        // return this.plannerService.create(createPlannerDto ,user);

        return this._Rel_Planner_Funnels_Library_Users_Service.create(createPlannerDto, user);

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
        // return this.plannerService.findOne(+id);

    }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() updatePlannerDto: UpdatePlannerDto) {
    //     return this.plannerService.update(+id, updatePlannerDto);
    //   }

    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    //     return this.plannerService.remove(+id);
    //   }
}
