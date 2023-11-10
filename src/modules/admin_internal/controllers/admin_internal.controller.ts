import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminInternalService } from '../services/admin_internal.service';
import { CreateAdminInternalDto } from '../dto/create-admin_internal.dto';
import { UpdateAdminInternalDto } from '../dto/update-admin_internal.dto';
import { Auth_Admin_Internal } from '../../auth/decorators/auth.decorator';
import { MigrationService } from '../services/migration.service';

@Controller('admin-internal')
@Auth_Admin_Internal()
export class AdminInternalController {
    constructor(
        private readonly adminInternalService: AdminInternalService,
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

}
