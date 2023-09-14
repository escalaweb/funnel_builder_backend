import { Module } from '@nestjs/common';
import { CustomizeProcessService } from './services/customize-process.service';
import { CustomizeProcessController } from './controllers/customize-process.controller';
import { CUSTOMIZE_PROCESS_ENTITIES_MODULE } from './entities/entities.module';
import { Rel_CustomizeProcess_Funnels_Library_Users_Module } from './rel-modules/rel-customizeProcess_funnels_library_users.module';

@Module({
    controllers: [CustomizeProcessController],
    providers: [CustomizeProcessService],
    imports: [
        CUSTOMIZE_PROCESS_ENTITIES_MODULE,
        Rel_CustomizeProcess_Funnels_Library_Users_Module
    ],
    exports: [
        CUSTOMIZE_PROCESS_ENTITIES_MODULE,
        CustomizeProcessService
    ]
})
export class CustomizeProcessModule { }
