import { Module } from '@nestjs/common';
import { FunnelArchivesService } from './services/funnel_archives.service';
import { FunnelArchivesController } from './controllers/funnel_archives.controller';

@Module({
  controllers: [FunnelArchivesController],
  providers: [FunnelArchivesService]
})
export class FunnelArchivesModule {}
