import { FileManagerService } from '../services/file-manager.service';
import { CreateFileManagerDto } from '../dto/create-file-manager.dto';
import { UpdateFileManagerDto } from '../dto/update-file-manager.dto';
export declare class FileManagerController {
    private readonly fileManagerService;
    constructor(fileManagerService: FileManagerService);
    create(createFileManagerDto: CreateFileManagerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFileManagerDto: UpdateFileManagerDto): string;
    remove(id: string): string;
}
