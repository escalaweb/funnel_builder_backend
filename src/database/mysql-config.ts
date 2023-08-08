import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { _Configuration_Keys } from "../config/config.keys";
import { ConfigProjectService } from "../config/config.service";


const _config = new ConfigProjectService(new ConfigService());

export const _MYSQL_CONNECTION_MODULE = TypeOrmModule.forRoot({
    type: 'mysql',
    host: _config._get(_Configuration_Keys.DB_HOST),
    port: Number(_config._get(_Configuration_Keys.DB_PORT)),
    database: _config._get(_Configuration_Keys.DB_NAME),
    username: _config._get(_Configuration_Keys.DB_USERNAME),
    password: _config._get(_Configuration_Keys.DB_PASSWORD),
    autoLoadEntities: true,
    synchronize: true
});



