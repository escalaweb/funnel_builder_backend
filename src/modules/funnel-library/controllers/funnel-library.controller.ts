import { Controller, Post, Body, Get, Param, Patch, Delete, Request } from "@nestjs/common";
import { CreateFunnelLibraryDto } from "../dto/create-funnel-library.dto";
import { UpdateFunnelLibraryDto } from "../dto/update-funnel-library.dto";
import { FunnelLibraryService } from "../services/funnel-library.service";
import { Auth } from "../../auth/decorators";
import { AuthPayload_I } from "../../auth/interfaces/_jwt-payload.interface";



@Controller('funnel-library')
@Auth()
export class FunnelLibraryController {
    constructor(
        private readonly funnelLibraryService: FunnelLibraryService
    ) { }

    @Post()
    create(@Body() createFunnelLibraryDto: CreateFunnelLibraryDto, @Request() req: any) {

        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.create(createFunnelLibraryDto, user);
        // return this.funnelLibraryService.test_transacs(createFunnelLibraryDto, user);

    }

    @Get()
    findAll(@Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.find(1, user);
    }

    //   @Get('initial')
    //   get_initial_funnel( @Request() req: any ) {
    //     const user: AuthPayload_I = req.user;
    //     return this.funnelLibraryService.get_initial_funnel(user);
    //   }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        return this.funnelLibraryService.findOne(id, user);
    }

    @Patch(':id')
    update(@Param('id',) id: string, @Body() updateFunnelLibraryDto: UpdateFunnelLibraryDto, @Request() req: any) {
        const user: AuthPayload_I = req.user;
        // return this.funnelLibraryService.update(id, updateFunnelLibraryDto, user);
    }

    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    // return this.funnelLibraryService.remove(+id);
    //   }
}
