import { Module } from '@nestjs/common';
import { FunnelArchivesService } from './funnel_archives.service';
import { FunnelArchivesController } from './funnel_archives.controller';

@Module({
  controllers: [FunnelArchivesController],
  providers: [FunnelArchivesService]
})
export class FunnelArchivesModule {}
