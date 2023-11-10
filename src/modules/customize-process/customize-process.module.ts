import { Module } from '@nestjs/common';
import { CustomizeProcessController } from './controllers/customize-process.controller';
import { CustomizeProces_Rel_Module } from './rel.module';
import { EntitiesModule } from '../../database/entities/entities.module';
import { CustomizeProcessService } from './services/customize-process.service';

@Module({
    controllers: [CustomizeProcessController],
    providers: [
        CustomizeProcessService
    ],
    imports: [
        EntitiesModule,
        CustomizeProces_Rel_Module
    ],
    exports: [
        CustomizeProcessService
    ]
})
export class CustomizeProcessModule { }
