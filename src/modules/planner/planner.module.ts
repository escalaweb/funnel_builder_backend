import { Module, forwardRef } from '@nestjs/common';
import { PlannerService } from './services/planner.service';
import { PlannerController } from './controllers/planner.controller';
import { CONFIGPLANNER_ENTITIES_MODULE } from './entities/entities.module';
import { Rel_Planner_Funnels_Library_Users_Module } from './rel-modules/rel-planner_funnels_library_users.module';

@Module({
  controllers: [PlannerController],
  providers: [PlannerService],
  imports: [
    CONFIGPLANNER_ENTITIES_MODULE,
    //   forwardRef(() => Rel_Planner_Funnels_Users_Module),
    Rel_Planner_Funnels_Library_Users_Module,
  ],
  exports: [
    CONFIGPLANNER_ENTITIES_MODULE,
    PlannerService
  ]
})
export class PlannerModule {}
