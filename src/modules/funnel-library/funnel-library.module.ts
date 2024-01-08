import { Module } from '@nestjs/common';
import { FunnelLibraryController } from './controllers/funnel-library.controller';
import { EntitiesModule } from '../../database/entities/entities.module';
import { FunnelLibrary_Rel_Module } from './rel.module';
import { FunnelBuilderService, FunnelLibraryService } from './services';


@Module({
    controllers: [
        FunnelLibraryController
    ],
    providers: [
        FunnelLibraryService,
        FunnelBuilderService
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
