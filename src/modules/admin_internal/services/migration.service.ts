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



            return 'Migrations executed'

        } catch (error) {
            console.error(error);
            throw new Error('Failed to run migrations');
        }

    }

    async revertMigrations(): Promise<string> {

        try {



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