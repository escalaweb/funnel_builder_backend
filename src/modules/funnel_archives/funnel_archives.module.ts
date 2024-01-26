import { Module } from '@nestjs/common';
import { FunnelArchivesController } from './controllers/funnel_archives.controller';
import { FunnelArchives_exportModule } from './funnel_archives_export.module';
import { Planner_exportModule } from '../planner/planner_export.module';

@Module({
    controllers: [
        FunnelArchivesController
    ],
    imports: [
        FunnelArchives_exportModule,

    ],
    providers: [
    ]
})
export class FunnelArchivesModule {  }
