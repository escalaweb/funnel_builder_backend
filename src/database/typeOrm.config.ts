import { DataSource } from "typeorm";
import { _Configuration_Keys } from "../config/config.keys";
import { ConfigProjectService } from "../config/config.service";
import { config } from 'dotenv';
import { ConfigService } from "@nestjs/config";

config();

// const _config = new ConfigProjectService();

const configService = new ConfigService();

export default new DataSource({

    type: 'postgres',
    host: configService.get(_Configuration_Keys.DB_HOST) || 'localhost',
    port: Number(configService.get(_Configuration_Keys.DB_PORT)) || 5432,
    database: configService.get(_Configuration_Keys.DB_NAME) || 'local_funnel_builder_escala',
    username: configService.get(_Configuration_Keys.DB_USERNAME) || 'postgres',
    password: configService.get(_Configuration_Keys.DB_PASSWORD) || 'fb_escala_Hj2pMV*',

    entities: ["dist/**/*.entity{.ts,.js}"],

    migrations: ["dist/database/migrations/*{.ts,.js}"],
    migrationsTableName: "_migrations",

});

