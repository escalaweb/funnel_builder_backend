import { PartialType } from '@nestjs/swagger';
import { CreateAdminInternalDto } from './create-admin_internal.dto';

export class UpdateAdminInternalDto extends PartialType(CreateAdminInternalDto) {}
