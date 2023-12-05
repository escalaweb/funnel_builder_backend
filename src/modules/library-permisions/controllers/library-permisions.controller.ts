import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibraryPermisionsService } from '../services/library-permisions.service';
import { CreateLibraryPermisionDto } from '../dto/create-library-permision.dto';
import { UpdateLibraryPermisionDto } from '../dto/update-library-permision.dto';

@Controller('library-permisions')
export class LibraryPermisionsController {
    constructor(
        private readonly libraryPermisionsService: LibraryPermisionsService
    ) { }

    //   @Post()
    //   create(@Body() createLibraryPermisionDto: CreateLibraryPermisionDto) {
    //     return this.libraryPermisionsService.create(createLibraryPermisionDto);
    //   }

    //   @Get()
    //   findAll() {
    //     return this.libraryPermisionsService.findAll();
    //   }

    //   @Get(':id')
    //   findOne(@Param('id') id: string) {
    //     return this.libraryPermisionsService.findOne(+id);
    //   }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() updateLibraryPermisionDto: UpdateLibraryPermisionDto) {
    //     return this.libraryPermisionsService.update(+id, updateLibraryPermisionDto);
    //   }

    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    //     return this.libraryPermisionsService.remove(+id);
    //   }
}
