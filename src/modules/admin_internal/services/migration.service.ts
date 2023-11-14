import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { EntityManager, createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { _Configuration_Keys } from '../../../config/config.keys';

const execAsync = promisify(exec);

const configService = new ConfigService();


@Injectable()
export class MigrationService {

    constructor(
        private readonly entityManager: EntityManager
    ) {

    }

    async runMigrations(): Promise<string> {
        // try {
        //     const { stdout, stderr } = await execAsync('npm run typeorm:run-mig');
        //     if (stderr) {
        //         console.error(`error: ${stderr}`);
        //     }
        //     return stdout;
        // } catch (error) {
        //     console.error(error);
        //     throw new Error('Failed to run migrations');
        // }

        try {

            let c: any = null;
            if (configService.get(_Configuration_Keys.ENVIROMENT) != 'developer') {

                c = {
                    type: 'postgres',
                    host: configService.get(_Configuration_Keys.DB_HOST) || 'localhost',
                    port: Number(configService.get(_Configuration_Keys.DB_PORT)) || 5432,
                    database: configService.get(_Configuration_Keys.DB_NAME) || 'local_funnel_builder_escala',
                    username: configService.get(_Configuration_Keys.DB_USERNAME) || 'postgres',
                    password: configService.get(_Configuration_Keys.DB_PASSWORD) || 'fb_escala_Hj2pMV*',
                    entities: ["dist/**/*.entity{.ts,.js}"],
                    migrations: ["dist/database/migrations/*{.ts,.js}"],
                    migrationsTableName: "_migrations",
                }

            } else {

                    c = {
                    type: 'postgres',
                    host: configService.get(_Configuration_Keys.DB_HOST) || 'localhost',
                    port: Number(configService.get(_Configuration_Keys.DB_PORT)) || 5432,
                    database: configService.get(_Configuration_Keys.DB_NAME) || 'local_funnel_builder_escala',
                    username: configService.get(_Configuration_Keys.DB_USERNAME) || 'postgres',
                    password: configService.get(_Configuration_Keys.DB_PASSWORD) || 'fb_escala_Hj2pMV*',
                    // entities: ["dist/**/*.entity{.ts,.js}"],
                    migrations: ["migrations/*{.ts,.js}"],
                    migrationsTableName: "_migrations",
                }


            }


            const connection = await createConnection(c);

            // Ejecutar migraciones
            await connection.runMigrations();

            // await connection.undoLastMigration();


            // Cerrar conexión
            await connection.close();


            return 'Migrations executed'

        } catch (error) {
            console.error(error);
            throw new Error('Failed to run migrations');
        }

    }

    async revertMigrations(): Promise<string> {
        // try {
        //     const { stdout, stderr } = await execAsync('npm run typeorm:revert-mig');
        //     if (stderr) {
        //         console.error(`error: ${stderr}`);
        //     }
        //     return stdout;
        // } catch (error) {
        //     console.error(error);
        //     throw new Error('Failed to revert migrations');
        // }

        try {

              let c: any = null;
            if (configService.get(_Configuration_Keys.ENVIROMENT) != 'developer') {

                c = {
                    type: 'postgres',
                    host: configService.get(_Configuration_Keys.DB_HOST) || 'localhost',
                    port: Number(configService.get(_Configuration_Keys.DB_PORT)) || 5432,
                    database: configService.get(_Configuration_Keys.DB_NAME) || 'local_funnel_builder_escala',
                    username: configService.get(_Configuration_Keys.DB_USERNAME) || 'postgres',
                    password: configService.get(_Configuration_Keys.DB_PASSWORD) || 'fb_escala_Hj2pMV*',
                    entities: ["dist/**/*.entity{.ts,.js}"],
                    migrations: ["dist/database/migrations/*{.ts,.js}"],
                    migrationsTableName: "_migrations",
                }

            } else {

                    c = {
                    type: 'postgres',
                    host: configService.get(_Configuration_Keys.DB_HOST) || 'localhost',
                    port: Number(configService.get(_Configuration_Keys.DB_PORT)) || 5432,
                    database: configService.get(_Configuration_Keys.DB_NAME) || 'local_funnel_builder_escala',
                    username: configService.get(_Configuration_Keys.DB_USERNAME) || 'postgres',
                    password: configService.get(_Configuration_Keys.DB_PASSWORD) || 'fb_escala_Hj2pMV*',
                    // entities: ["dist/**/*.entity{.ts,.js}"],
                    migrations: ["migrations/*{.ts,.js}"],
                    migrationsTableName: "_migrations",
                }


            }


            const connection = await createConnection(c);

            await connection.undoLastMigration();


            // Cerrar conexión
            await connection.close();


            return 'Migrations reverted'

        } catch (error) {

        }
    }

    async getMigrations(): Promise<any[]> {
        const queryRunner = this.entityManager.connection.createQueryRunner();
        await queryRunner.connect();
        const migrations = await queryRunner.query(`SELECT * FROM "_migrations"`);
        await queryRunner.release();
        return migrations;
    }

}