import { PartialType } from '@nestjs/swagger';
import { CreateFunnelDto } from './create-funnel.dto';

export class UpdateFunnelDto extends PartialType(CreateFunnelDto) {}
