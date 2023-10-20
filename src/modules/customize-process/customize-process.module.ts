import { Module } from '@nestjs/common';
import { CustomizeProcessService } from './services/customize-process.service';
import { CustomizeProcessController } from './controllers/customize-process.controller';
import { CUSTOMIZE_PROCESS_ENTITIES_MODULE } from './entities/entities.module';
import { Rel_CustomizeProcess_Funnels_Library_Users_Module } from './rel-modules/rel-customizeProcess_funnels_library_users.module';
import { EntitiesModule } from '../../database/entities/entities.module';

@Module({
    controllers: [CustomizeProcessController],
    providers: [CustomizeProcessService],
    imports: [
        EntitiesModule,
        Rel_CustomizeProcess_Funnels_Library_Users_Module
    ],
    exports: [

        CustomizeProcessService
    ]
})
export class CustomizeProcessModule { }
