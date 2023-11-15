import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { _Configuration_Keys } from "../config/config.keys";
import { ConfigProjectService } from "../config/config.service";


const _config = new ConfigProjectService();

export const _POSTGRES_CONNECTION_MODULE = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => ({
        type: 'postgres',
        host: _config._get(_Configuration_Keys.DB_HOST),
        port: Number(_config._get(_Configuration_Keys.DB_PORT)),
        database: _config._get(_Configuration_Keys.DB_NAME),
        username: _config._get(_Configuration_Keys.DB_USERNAME),
        password: _config._get(_Configuration_Keys.DB_PASSWORD),
        // entities: [],
        // synchronize: (_config._get(_Configuration_Keys.NODE_ENV) === 'development')? true: false,
        // synchronize: true,
        synchronize: false,
        autoLoadEntities: true,

    })

}
);





