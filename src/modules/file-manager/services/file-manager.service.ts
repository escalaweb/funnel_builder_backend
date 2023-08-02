import { Injectable } from '@nestjs/common';
import { CreateFileManagerDto } from '../dto/create-file-manager.dto';
import { UpdateFileManagerDto } from '../dto/update-file-manager.dto';

@Injectable()
export class FileManagerService {
  create(createFileManagerDto: CreateFileManagerDto) {
    return 'This action adds a new fileManager';
  }

  findAll() {
    return `This action returns all fileManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileManager`;
  }

  update(id: number, updateFileManagerDto: UpdateFileManagerDto) {
    return `This action updates a #${id} fileManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileManager`;
  }
}
