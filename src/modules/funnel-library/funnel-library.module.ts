import { Module } from '@nestjs/common';
import { FunnelLibraryController } from './controllers/funnel-library.controller';
import { Db_Module } from '../../database/DB.module';
import { FunnelLibrary_Rel_Module } from './rel.module';
import { FunnelBuilderService, FunnelLibraryService } from './services';
import { Planner_exportModule } from '../planner/planner_export.module';
import { FunnelArchives_exportModule } from '../funnel_archives/funnel_archives_export.module';


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
        FunnelLibrary_Rel_Module,
        Planner_exportModule,
        FunnelArchives_exportModule
    ],
    exports: [
        FunnelLibraryService,
        FunnelBuilderService,
    ]
})
export class FunnelLibraryModule { }
