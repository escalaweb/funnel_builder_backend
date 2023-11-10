import { Module } from '@nestjs/common';
import { AdminInternalService } from './services/admin_internal.service';
import { AdminInternalController } from './controllers/admin_internal.controller';
import { MigrationService } from './services/migration.service';
import { Admin_Internal_Rel_Module } from './rel.module';

@Module({
    controllers: [
        AdminInternalController
    ],
    providers: [
        AdminInternalService,
        MigrationService
    ],
    imports: [
        Admin_Internal_Rel_Module
    ]
})
export class AdminInternalModule { }
