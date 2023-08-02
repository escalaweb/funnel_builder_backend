import { CreateFunnelLibraryDto } from "../dto/create-funnel-library.dto";
import { UpdateFunnelLibraryDto } from "../dto/update-funnel-library.dto";
import { FunnelLibraryService } from "../services/funnel-library.service";
export declare class FunnelLibraryController {
    private readonly funnelLibraryService;
    constructor(funnelLibraryService: FunnelLibraryService);
    create(createFunnelLibraryDto: CreateFunnelLibraryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFunnelLibraryDto: UpdateFunnelLibraryDto): string;
    remove(id: string): string;
}
