import { FunnelsService } from '../services/funnels.service';
import { CreateFunnelDto } from '../dto/create-funnel.dto';
import { UpdateFunnelDto } from '../dto/update-funnel.dto';
export declare class FunnelsController {
    private readonly funnelsService;
    constructor(funnelsService: FunnelsService);
    create(createFunnelDto: CreateFunnelDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFunnelDto: UpdateFunnelDto): string;
    remove(id: string): string;
}
