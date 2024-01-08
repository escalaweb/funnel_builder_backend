import { Module, forwardRef } from '@nestjs/common';
import { FunnelsController } from './controllers/funnels.controller';

import { Funnels_Rel_Module } from './rel.module';
import { EntitiesModule } from '../../database/entities/entities.module';
import { FunnelsService } from './services';


@Module({
    controllers: [FunnelsController],
    providers: [
        FunnelsService,

    ],
    imports: [
        EntitiesModule,
        forwardRef(() => Funnels_Rel_Module)
    ],
    exports: [
        FunnelsService,
    ]
})
export class FunnelsModule { }
