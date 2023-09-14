import { ConfigService } from "@nestjs/config";
import { _Configuration_Keys } from "../config/config.keys";
import { ConfigProjectService } from "../config/config.service";

import { DataSource } from 'typeorm';



const _config = new ConfigProjectService(new ConfigService());


export default new DataSource({
    type: 'postgres',
    host: _config._get(_Configuration_Keys.DB_HOST),
    port: Number(_config._get(_Configuration_Keys.DB_PORT)),
    database: _config._get(_Configuration_Keys.DB_NAME),
    username: _config._get(_Configuration_Keys.DB_USERNAME),
    password: _config._get(_Configuration_Keys.DB_PASSWORD),
    entities: ['src/**/**/*.entity.ts'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    // synchronize: true,
    // autoLoadEntities: true,

});