import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";

// import { _MONGOOSEMODULE } from "../database/mongo-config";
import { EnvConfigurations } from "./app.config";
import { ConfigProjectService } from "./config.service";
import { _POSTGRES_CONNECTION_MODULE } from '../database/postgres-config';
// import { dynamoDBProvider } from '../database/dynamoose-config';
// import { _MYSQL_CONNECTION_MODULE } from '../database/mysql-config';
// import { DynamooseDbModule } from '../database/dynamoose-config';

@Global()
@Module({
    imports: [

        ConfigModule.forRoot({
            load: [EnvConfigurations],
        }),

        _POSTGRES_CONNECTION_MODULE



    ],
    providers: [
        {
            provide: ConfigProjectService,
            useValue: new ConfigProjectService(
                new ConfigService()
            ),
        },
        // dynamoDBProvider
    ],
    exports: [ConfigProjectService],
})
export class ConfigProjectModule { }

