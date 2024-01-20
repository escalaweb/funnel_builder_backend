import { Module } from '@nestjs/common';
import { PlannerController } from './controllers/planner.controller';
import { Planner_Rel_Module } from './rel.module';
import { PlannerService } from './services/planner.service';
import { Db_Module } from '../../database/DB.module';



@Module({
    controllers: [PlannerController],
    providers: [
        PlannerService
    ],
    imports: [
        Db_Module,
        Planner_Rel_Module
    ],
    exports: [
        PlannerService
    ]
})
export class PlannerModule { }
