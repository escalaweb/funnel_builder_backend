import { Test, TestingModule } from '@nestjs/testing';
import { FunnelArchivesController } from './funnel_archives.controller';
import { FunnelArchivesService } from './funnel_archives.service';

describe('FunnelArchivesController', () => {
  let controller: FunnelArchivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FunnelArchivesController],
      providers: [FunnelArchivesService],
    }).compile();

    controller = module.get<FunnelArchivesController>(FunnelArchivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
