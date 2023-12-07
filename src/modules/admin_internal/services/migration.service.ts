import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { _Configuration_Keys } from '../../../config/config.keys';
import { Connection } from 'typeorm';
import { MigrationFunctionsModel_I, _MigrationTable_I } from '../../../database/interfaces/_migrationModel.interface';
import { _LoggerService } from '../../../common/services/_logger.service';
import { ConfigProjectService } from '../../../config/config.service';
import { _response_I } from '../../../common/interfaces';
import { _globalMigs } from '../../../database/migrations/initMigrations';
// import { _globalMigs } from '../../../database/migrations/initMigrations';

@Injectable()
export class MigrationService {

    _config = new ConfigProjectService();

    // private migrations: MigrationModel_I[] = [];
    private migrations: MigrationFunctionsModel_I[] = [];

    constructor(
        private readonly entityManager: EntityManager,
        // private readonly dataSource: DataSource,
        private readonly connection: Connection,

        private readonly _LoggerService: _LoggerService,
    ) {

        this.set_migrationsTable();

    }

    async set_migrationsTable() {

        this.migrations = _globalMigs;

        // for (const iterator of this.migrations) {
        //         console.log('iterator', iterator.mig.up());
        // }

        // console.log('migrations', this.migrations[0].mig.up())

        this.getMigrations().then(async (migrations) => {
        }, async (err) => {
            if (err.code === '42P01') {
                const queryRunner = this.entityManager.connection.createQueryRunner();
                await queryRunner.query(`CREATE TABLE IF NOT EXISTS "_migrations" (id SERIAL PRIMARY KEY, timestamp BIGINT, name VARCHAR)`);
            }
        })

    }

    async runMigrations(): Promise<string> {

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        this._LoggerService.log({
            message: 'Ejecución Migraciones UP - INICIADO',
            response: {},
            context: 'MigrationService - runMigrations',
        })

        try {

            const _migrations: _MigrationTable_I[] = await this.getMigrations();

            for (const migration of this.migrations) {


                console.log('migration.name', migration.name);
                if (_migrations.some(item => item.name === migration.name)) {
                    continue;
                }

                // for (const query of migration.up) {

                //     await queryRunner.query(query);
                // }
                await migration.mig.up(queryRunner);

                // Registrar la migración
                // if (migration.register) {
                const timestamp = Date.now();
                await queryRunner.query(`INSERT INTO "_migrations" (timestamp, name) VALUES (${timestamp}, '${migration.name}')`);
                // }

            }

            await queryRunner.commitTransaction();

            this._LoggerService.log({
                message: 'Ejecución Migraciones UP - COMPLETADO',
                response: {
                    body: {
                        migraciones: [...this.migrations]
                    }
                },
                context: 'MigrationService - runMigrations',
            })

            return 'Migrations run UP successfully ';

        } catch (error) {
            await queryRunner.rollbackTransaction();

            // console.error(error);
            this._LoggerService.log({
                message: 'Ejecución Migraciones UP - FALLIDO',
                response: {
                    body: {
                        migraciones: [...this.migrations],
                        error: error
                    }
                },
                context: 'MigrationService - runMigrations',
            })

            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async revertMigrations(): Promise<string> {

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        this._LoggerService.log({
            message: 'Ejecución Migraciones DOWN - INICIADO',
            response: {},
            context: 'MigrationService - revertMigrations',
        })

        try {

            const _migrations: _MigrationTable_I[] = await this.getMigrations();

            let migration: MigrationFunctionsModel_I;

            if (_migrations.length > 0) {

                migration = this.migrations.find(item => item.name === _migrations[_migrations.length - 1].name);

                // for (const query of migration.down) {
                //     await queryRunner.query(query);
                // }

                await migration.mig.down(queryRunner);

                // Eliminar la migración
                // if (migration.register) {
                await queryRunner.query(`DELETE FROM "_migrations" WHERE name = '${migration.name}'`);
                // }

            }

            await queryRunner.commitTransaction();

            this._LoggerService.log({
                message: 'Ejecución Migraciones DOWN - COMPLETADO',
                response: {
                    body: {
                        migraciones: [...this.migrations]
                    }
                },
                context: 'MigrationService - runMigrations',
            })


            return 'Migrations run DOWN successfully';

        } catch (error) {
            await queryRunner.rollbackTransaction();

            // console.error(error);
            this._LoggerService.log({
                message: 'Ejecución Migraciones UP - FALLIDO',
                response: {
                    body: {
                        migraciones: [...this.migrations],
                        error: error
                    }
                },
                context: 'MigrationService - runMigrations',
            })

            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getMigrations(): Promise<_MigrationTable_I[]> {
        const queryRunner = this.entityManager.connection.createQueryRunner();
        await queryRunner.connect();
        const migrations = await queryRunner.query(`SELECT * FROM "_migrations"`);
        await queryRunner.release();
        return migrations;
    }



}
