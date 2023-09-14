import { ConfigService } from "@nestjs/config";
import { _Configuration_Keys } from "../config/config.keys";
import { ConfigProjectService } from "../config/config.service";

import { DataSource } from 'typeorm';
import { config } from "dotenv";
import { FunnelLibrary_et } from "../modules/funnel-library/entities";
import { FunnelBody_et, FunnelBody_stages_et } from "../modules/funnels/entities";
import { ConfigPlanner_et } from "../modules/planner/entities";
import { CustomizeProcess_et } from '../modules/customize-process/entities/customize-process.entity';
import { User_et } from "../modules/users/entities";



config();

const _config = new ConfigProjectService(new ConfigService());

export default new DataSource({
    type: 'postgres',
    host: _config._get(_Configuration_Keys.DB_HOST),
    port: Number(_config._get(_Configuration_Keys.DB_PORT)),
    database: _config._get(_Configuration_Keys.DB_NAME),
    username: _config._get(_Configuration_Keys.DB_USERNAME),
    password: _config._get(_Configuration_Keys.DB_PASSWORD),
    entities: [
        User_et,
        FunnelLibrary_et,
        FunnelBody_et,
        FunnelBody_stages_et,
        ConfigPlanner_et,
        CustomizeProcess_et
    ]
    // entities: ['src/**/**/*.entity.ts'],
    // migrations: ['src/database/migrations/*{.ts,.js}'],
    // synchronize: true,
    // autoLoadEntities: true,

});