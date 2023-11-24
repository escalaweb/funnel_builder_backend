import { Body, Controller, Get, Post, Param, Request } from '@nestjs/common';
import { AdminInternalService } from '../services/admin_internal.service';
import { Auth_Admin_Internal } from '../../auth/decorators/auth.decorator';
import { MigrationService } from '../services/migration.service';
import { Admin_FunnelBuilder_handler_Service } from '../services/admin_funnelBuilder_handler.service';

@Controller('admin-internal')
@Auth_Admin_Internal()
export class AdminInternalController {
    constructor(
        private readonly adminInternalService: AdminInternalService,
        private readonly Admin_FunnelBuilder_handler_Service: Admin_FunnelBuilder_handler_Service,
        private readonly migrationService: MigrationService

    ) { }

    @Get('/migs')
    getMigrations() {
        return this.migrationService.getMigrations();
    }

    @Get('/run')
    runMigrations() {
        return this.migrationService.runMigrations();
    }

    @Get('/revert')
    revertMigrations() {
        return this.migrationService.revertMigrations();
    }


    @Post('/setData/:email')
    set_FbData(@Body() _fbData: any, @Param('email') email: string, @Request() req: any) {

        return this.Admin_FunnelBuilder_handler_Service.set_FbData(_fbData, email, req);

    }


}
