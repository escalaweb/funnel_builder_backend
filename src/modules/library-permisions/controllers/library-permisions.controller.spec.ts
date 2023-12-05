import { Test, TestingModule } from '@nestjs/testing';
import { LibraryPermisionsController } from './library-permisions.controller';
import { LibraryPermisionsService } from '../services/library-permisions.service';

describe('LibraryPermisionsController', () => {
  let controller: LibraryPermisionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryPermisionsController],
      providers: [LibraryPermisionsService],
    }).compile();

    controller = module.get<LibraryPermisionsController>(LibraryPermisionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
