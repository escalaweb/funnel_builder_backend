import { Module } from '@nestjs/common';
import { FunnelArchivesService } from './services/funnel_archives.service';
import { FunnelArchivesController } from './controllers/funnel_archives.controller';
import { FunnelArchives_Rel_Module } from './rel.module';

@Module({
    controllers: [
        FunnelArchivesController
    ],
    imports: [
        FunnelArchives_Rel_Module
    ],
    providers: [
        FunnelArchivesService
    ]
})
export class FunnelArchivesModule {  }
