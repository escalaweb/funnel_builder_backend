import { Module, forwardRef } from '@nestjs/common';
import { FunnelsService } from './services/funnels.service';
import { FunnelsController } from './controllers/funnels.controller';

import { FUNNELS_ENTITIES_MODULE, FUNNEL_STAGES_ENTITIES_MODULE } from './entities/entities.module';
import { Rel_Funnels_Planner_Library_Users_Module } from './rel-modules/rel-funnels_planner_library_users.module';
import { EntitiesModule } from '../../database/entities/entities.module';

@Module({
    controllers: [FunnelsController],
    providers: [FunnelsService],
    imports: [

        EntitiesModule,
        Rel_Funnels_Planner_Library_Users_Module


    ],
    exports: [

        FunnelsService
    ]
})
export class FunnelsModule { }
