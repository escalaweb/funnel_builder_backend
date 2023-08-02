import { CreateFileManagerDto } from '../dto/create-file-manager.dto';
import { UpdateFileManagerDto } from '../dto/update-file-manager.dto';
export declare class FileManagerService {
    create(createFileManagerDto: CreateFileManagerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFileManagerDto: UpdateFileManagerDto): string;
    remove(id: number): string;
}
