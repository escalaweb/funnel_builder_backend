import { Module } from '@nestjs/common';
import { PlannerController } from './controllers/planner.controller';
import { Planner_Rel_Module } from './rel.module';
import { EntitiesModule } from '../../database/entities/entities.module';
import { PlannerService } from './services/planner.service';



@Module({
    controllers: [PlannerController],
    providers: [
        PlannerService
    ],
    imports: [
        EntitiesModule,
        Planner_Rel_Module
    ],
    exports: [
        PlannerService
    ]
})
export class PlannerModule { }
