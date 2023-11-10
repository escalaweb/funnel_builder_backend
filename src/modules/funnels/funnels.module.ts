import { Module } from '@nestjs/common';
import { FunnelsController } from './controllers/funnels.controller';

import { Funnels_Rel_Module } from './rel.module';
import { FunnelsService } from './services/funnels.service';
import { EntitiesModule } from '../../database/entities/entities.module';


@Module({
    controllers: [FunnelsController],
    providers: [
        FunnelsService
    ],
    imports: [
        EntitiesModule,
        Funnels_Rel_Module
    ],
    exports: [
        FunnelsService
    ]
})
export class FunnelsModule { }
