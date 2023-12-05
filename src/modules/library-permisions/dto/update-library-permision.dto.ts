import { PartialType } from '@nestjs/swagger';
import { CreateLibraryPermisionDto } from './create-library-permision.dto';

export class UpdateLibraryPermisionDto extends PartialType(CreateLibraryPermisionDto) {}
