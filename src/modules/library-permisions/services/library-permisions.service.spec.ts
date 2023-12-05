import { Test, TestingModule } from '@nestjs/testing';
import { LibraryPermisionsService } from './library-permisions.service';

describe('LibraryPermisionsService', () => {
  let service: LibraryPermisionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryPermisionsService],
    }).compile();

    service = module.get<LibraryPermisionsService>(LibraryPermisionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
