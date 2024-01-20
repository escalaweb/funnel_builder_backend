import { Module } from '@nestjs/common';
import { CustomizeProcessController } from './controllers/customize-process.controller';
import { CustomizeProces_Rel_Module } from './rel.module';
import { CustomizeProcessService } from './services/customize-process.service';
import { Db_Module } from '../../database/DB.module';

@Module({
    controllers: [CustomizeProcessController],
    providers: [

        CustomizeProcessService
    ],
    imports: [
        Db_Module,

        CustomizeProces_Rel_Module
    ],
    exports: [
        CustomizeProcessService
    ]
})
export class CustomizeProcessModule { }
