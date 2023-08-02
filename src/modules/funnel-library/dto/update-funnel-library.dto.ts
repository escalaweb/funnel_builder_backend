import { PartialType } from '@nestjs/swagger';
import { CreateFunnelLibraryDto } from './create-funnel-library.dto';

export class UpdateFunnelLibraryDto extends PartialType(CreateFunnelLibraryDto) {}
