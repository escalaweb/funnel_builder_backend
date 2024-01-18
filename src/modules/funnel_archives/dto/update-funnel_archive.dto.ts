import { PartialType } from '@nestjs/swagger';
import { CreateFunnelArchiveDto } from './create-funnel_archive.dto';

export class UpdateFunnelArchiveDto extends PartialType(CreateFunnelArchiveDto) {}
