import { Module } from '@nestjs/common';
import { PlannerService } from './services/planner.service';
import { PlannerController } from './controllers/planner.controller';

@Module({
  controllers: [PlannerController],
  providers: [PlannerService]
})
export class PlannerModule {}
