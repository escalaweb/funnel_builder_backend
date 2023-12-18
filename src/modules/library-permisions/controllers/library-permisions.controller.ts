import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { LibraryPermisionsService } from '../services/library-permisions.service';
import { CreateLibraryPermisionDto } from '../dto/create-library-permision.dto';
import { UpdateLibraryPermisionDto } from '../dto/update-library-permision.dto';
import { AuthPayload_I } from '../../auth/interfaces';

@Controller('library-permisions')
export class LibraryPermisionsController {
    constructor(
        private readonly libraryPermisionsService: LibraryPermisionsService
    ) { }




    //   @Post()
    //   create(@Body() createLibraryPermisionDto: CreateLibraryPermisionDto) {
    //     return this.libraryPermisionsService.create(createLibraryPermisionDto);
    //   }



    @Get(':libraryPermision_id')
    findOne_byId(@Param('libraryPermision_id') libraryPermision_id: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        return this.libraryPermisionsService.findOne_byId(libraryPermision_id, user);

    }

    @Get('/byLibrary/:funnelLibrary_id')
    findOne_byLibraryId(@Param('funnelLibrary_id') funnelLibrary_id: string, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        return this.libraryPermisionsService.findAll_byLibraryId(funnelLibrary_id, user);

    }

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
