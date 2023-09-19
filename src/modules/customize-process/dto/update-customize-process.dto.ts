import { PartialType } from '@nestjs/swagger';
import { CreateCustomizeProcessDto } from './create-customize-process.dto';

export class UpdateCustomizeProcessDto extends PartialType(CreateCustomizeProcessDto) {}
