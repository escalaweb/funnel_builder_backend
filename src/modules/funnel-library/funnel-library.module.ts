import { Module } from '@nestjs/common';
import { FunnelLibraryService } from './services/funnel-library.service';
import { FunnelLibraryController } from './controllers/funnel-library.controller';
import { UsersModule } from '../users/users.module';
import { FUNNEL_LIBRARY_ENTITIES_MODULE } from './entities/entities.module';
import { EntitiesModule } from '../../database/entities/entities.module';



@Module({
    controllers: [FunnelLibraryController],
    providers: [FunnelLibraryService],
    imports: [

        EntitiesModule,

        UsersModule

    ],
    exports: [

        FunnelLibraryService
    ]
})
export class FunnelLibraryModule { }
