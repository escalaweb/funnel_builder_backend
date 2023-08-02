import { CreateFunnelLibraryDto } from '../dto/create-funnel-library.dto';
import { UpdateFunnelLibraryDto } from '../dto/update-funnel-library.dto';
export declare class FunnelLibraryService {
    create(createFunnelLibraryDto: CreateFunnelLibraryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFunnelLibraryDto: UpdateFunnelLibraryDto): string;
    remove(id: number): string;
}
