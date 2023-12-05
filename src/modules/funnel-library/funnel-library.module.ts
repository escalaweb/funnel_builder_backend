import { Module } from '@nestjs/common';
import { FunnelLibraryController } from './controllers/funnel-library.controller';
import { EntitiesModule } from '../../database/entities/entities.module';
import { FunnelLibrary_Rel_Module } from './rel.module';
import { FunnelLibraryService } from './services/funnel-library.service';



@Module({
    controllers: [
        FunnelLibraryController
    ],
    providers: [
        FunnelLibraryService
    ],
    imports: [
        EntitiesModule,
        FunnelLibrary_Rel_Module
    ],
    exports: [
        FunnelLibraryService
    ]
})
export class FunnelLibraryModule { }
