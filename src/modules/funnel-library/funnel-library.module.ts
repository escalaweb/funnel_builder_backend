import { Module } from '@nestjs/common';
import { FunnelLibraryService } from './services/funnel-library.service';
import { FunnelLibraryController } from './controllers/funnel-library.controller';
import { UsersModule } from '../users/users.module';
import { FUNNEL_LIBRARY_ENTITIES_MODULE } from './entities/entities.module';



@Module({
    controllers: [FunnelLibraryController],
    providers: [FunnelLibraryService],
    imports: [

        FUNNEL_LIBRARY_ENTITIES_MODULE,
        UsersModule

    ],
    exports: [
        FUNNEL_LIBRARY_ENTITIES_MODULE,
        FunnelLibraryService
    ]
})
export class FunnelLibraryModule { }
