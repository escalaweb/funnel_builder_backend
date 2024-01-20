import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";

import { EnvConfigurations } from "./app.config";
import { ConfigProjectService } from "./config.service";
import { _POSTGRES_CONNECTION_MODULE } from '../database/postgres-config.module';


@Global()
@Module({
    imports: [

        ConfigModule.forRoot({
            load: [EnvConfigurations],
        }),

        _POSTGRES_CONNECTION_MODULE,

    ],
    providers: [
        {
            provide: ConfigProjectService,
            useValue: new ConfigProjectService(
            ),
        },
    ],
    exports: [ConfigProjectService],
})
export class ConfigProjectModule { }

