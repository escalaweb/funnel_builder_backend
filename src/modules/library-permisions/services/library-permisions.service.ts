import { Injectable } from '@nestjs/common';
import { CreateLibraryPermisionDto } from '../dto/create-library-permision.dto';
import { UpdateLibraryPermisionDto } from '../dto/update-library-permision.dto';

@Injectable()
export class LibraryPermisionsService {
  create(createLibraryPermisionDto: CreateLibraryPermisionDto) {
    return 'This action adds a new libraryPermision';
  }

  findAll() {
    return `This action returns all libraryPermisions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} libraryPermision`;
  }

  update(id: number, updateLibraryPermisionDto: UpdateLibraryPermisionDto) {
    return `This action updates a #${id} libraryPermision`;
  }

  remove(id: number) {
    return `This action removes a #${id} libraryPermision`;
  }
}
