import { Module } from '@nestjs/common';
import { FunnelsController } from './controllers/funnels.controller';

import { Funnels_Rel_Module } from './rel.module';
import { Db_Module } from '../../database/DB.module';
import { FunnelsService } from './services';


@Module({
    controllers: [FunnelsController],
    providers: [
       FunnelsService,
    ],
    imports: [
        Db_Module,
        Funnels_Rel_Module,
    ],
    exports: [
       FunnelsService,

    ]
})
export class FunnelsModule { }
