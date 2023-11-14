import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { EntityManager } from 'typeorm';

const execAsync = promisify(exec);

@Injectable()
export class MigrationService {

    constructor(
        private readonly entityManager: EntityManager
    ) {

    }

    async runMigrations(): Promise<string> {
        try {
            const { stdout, stderr } = await execAsync('sls migrate up');
            if (stderr) {
                console.error(`error: ${stderr}`);
            }
            return stdout;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to run migrations');
        }
    }

    async revertMigrations(): Promise<string> {
        try {
            const { stdout, stderr } = await execAsync('sls migrate down');
            if (stderr) {
                console.error(`error: ${stderr}`);
            }
            return stdout;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to revert migrations');
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