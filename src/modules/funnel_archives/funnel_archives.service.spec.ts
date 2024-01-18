import { Test, TestingModule } from '@nestjs/testing';
import { FunnelArchivesService } from './funnel_archives.service';

describe('FunnelArchivesService', () => {
  let service: FunnelArchivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FunnelArchivesService],
    }).compile();

    service = module.get<FunnelArchivesService>(FunnelArchivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
