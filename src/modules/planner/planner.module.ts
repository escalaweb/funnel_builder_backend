import { Module } from '@nestjs/common';
import { PlannerController } from './controllers/planner.controller';
import { Planner_Rel_Module } from './rel.module';
import { PlannerService } from './services/planner.service';
import { Db_Module } from '../../database/DB.module';
import { Planner_exportModule } from './planner_export.module';

@Module({
    controllers: [PlannerController],
    providers: [

    ],
    imports: [
        Db_Module,
        // Planner_Rel_Module
        Planner_exportModule
    ],
    exports: [

    ]
})
export class PlannerModule { }
