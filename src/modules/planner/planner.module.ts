import { Module, forwardRef } from '@nestjs/common';
import { PlannerService } from './services/planner.service';
import { PlannerController } from './controllers/planner.controller';

import { Rel_Planner_Funnels_Library_Users_Module } from './rel-modules/rel-planner_funnels_library_users.module';
import { EntitiesModule } from '../../database/entities/entities.module';

@Module({
  controllers: [PlannerController],
  providers: [PlannerService],
  imports: [
    EntitiesModule,
    //   forwardRef(() => Rel_Planner_Funnels_Users_Module),
    Rel_Planner_Funnels_Library_Users_Module,
  ],
  exports: [

    PlannerService
  ]
})
export class PlannerModule {}
