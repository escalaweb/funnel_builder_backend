import { Module } from '@nestjs/common';
import { AdminInternalService } from './services/admin_internal.service';
import { AdminInternalController } from './controllers/admin_internal.controller';
import { MigrationService } from './services/migration.service';
import { Admin_Internal_Rel_Module } from './rel.module';
import { Admin_FunnelBuilder_handler_Service } from './services/admin_funnelBuilder_handler.service';
import { EntitiesModule } from '../../database/entities/entities.module';

@Module({
    controllers: [
        AdminInternalController
    ],
    providers: [
        AdminInternalService,
        MigrationService,
        Admin_FunnelBuilder_handler_Service
    ],
    imports: [
        EntitiesModule,
        Admin_Internal_Rel_Module
    ],
    exports: [
        AdminInternalService,
        MigrationService,
        Admin_FunnelBuilder_handler_Service
    ]
})
export class AdminInternalModule { }
