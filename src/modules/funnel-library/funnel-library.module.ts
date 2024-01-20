import { Module } from '@nestjs/common';
import { FunnelLibraryController } from './controllers/funnel-library.controller';
import { Db_Module } from '../../database/DB.module';
import { FunnelLibrary_Rel_Module } from './rel.module';
import { FunnelBuilderService, FunnelLibraryService } from './services';


@Module({
    controllers: [
        FunnelLibraryController
    ],
    providers: [
        FunnelLibraryService,
        FunnelBuilderService,
    ],
    imports: [
        Db_Module,
        FunnelLibrary_Rel_Module
    ],
    exports: [
        FunnelLibraryService,
        FunnelBuilderService,
    ]
})
export class FunnelLibraryModule { }
