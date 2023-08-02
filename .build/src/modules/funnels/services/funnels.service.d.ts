import { CreateFunnelDto } from '../dto/create-funnel.dto';
import { UpdateFunnelDto } from '../dto/update-funnel.dto';
export declare class FunnelsService {
    create(createFunnelDto: CreateFunnelDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFunnelDto: UpdateFunnelDto): string;
    remove(id: number): string;
}
