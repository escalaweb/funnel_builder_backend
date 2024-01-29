import { Module } from '@nestjs/common';
import { PermisionsRequestsService } from './services/permisions-requests.service';
import { PermisionsRequestsController } from './controllers/permisions-requests.controller';
import { Db_Module } from '../../database/DB.module';

@Module({
    controllers: [PermisionsRequestsController],
    imports: [
        Db_Module
    ],
    providers: [
        PermisionsRequestsService
    ],
    exports: [
        PermisionsRequestsService
    ]
})
export class PermisionsRequestsModule {}
