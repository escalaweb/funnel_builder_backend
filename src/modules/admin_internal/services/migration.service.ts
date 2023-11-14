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

        try {

<<<<<<< Updated upstream
            const connection = await createConnection({

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

            // Ejecutar migraciones
            await connection.runMigrations();

            // await connection.undoLastMigration();


            // Cerrar conexión
            await connection.close();
=======
>>>>>>> Stashed changes


            return 'Migrations executed'

        } catch (error) {
                       console.error(error);
            throw new Error('Failed to run migrations');
        }

    }

    async revertMigrations(): Promise<string> {

        try {

<<<<<<< Updated upstream
            const connection = await createConnection({

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

            // Ejecutar migraciones
            // await connection.runMigrations();

            await connection.undoLastMigration();


            // Cerrar conexión
            await connection.close();
=======
>>>>>>> Stashed changes


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