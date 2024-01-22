import { MigrationInterface, QueryRunner } from "typeorm"

import * as uuid from 'uuid';

export class ReformatDataByArchives1705794742714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE "funnels" ADD COLUMN "archives_id" uuid;
        `);
        // Establecer la restricción foránea para archives_id
         await queryRunner.query(`ALTER TABLE "funnels" ADD CONSTRAINT "FK_99f4f565501456422bc0b26ac7f" FOREIGN KEY ("archives_id") REFERENCES "funnels_archive"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`
            ALTER TABLE "config_planner" ADD COLUMN "archives_id" uuid;
        `);
        // Establecer la restricción foránea para archives_id
        await queryRunner.query(`ALTER TABLE "config_planner" ADD CONSTRAINT "UQ_4cd98327eb2e4620249d55b9bd9" UNIQUE ("archives_id")`);
        await queryRunner.query(`ALTER TABLE "config_planner" ADD CONSTRAINT "FK_4cd98327eb2e4620249d55b9bd9" FOREIGN KEY ("archives_id") REFERENCES "funnels_archive"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        const funnelsLibraryRecords = await queryRunner.query(`SELECT * FROM "funnels_library"`);

        for (const record of funnelsLibraryRecords) {

            const archive_id: string = uuid.v4();

            await queryRunner.query(
                `INSERT INTO "funnels_archive" ("name", "funnelLibrary_id", "config_step_id", "user_id", "_id") VALUES ($1, $2, $3, $4, $5)`,
                ['Archivo 1', record._id, record.config_step_id, record.user_id, archive_id]
            );
            await queryRunner.query(
                `UPDATE config_planner
            SET archives_id = $1
            WHERE _id = $2`,
                [archive_id, record.config_step_id]
            );
            await queryRunner.query(
                `UPDATE funnels
            SET archives_id = $1
            WHERE "funnelLibrary_id" = $2`,
                [archive_id, record._id]
            );

        }

        // Eliminar las constaints foraneas
        await queryRunner.query(`
            ALTER TABLE "funnels_library" DROP CONSTRAINT "FK_38777a64969bf4a2ccc7bd36f38";
        `);
        await queryRunner.query(`
            ALTER TABLE "config_planner" DROP CONSTRAINT "FK_260ff358f68ff0e370346320010";
        `);
        await queryRunner.query(`
            ALTER TABLE "funnels" DROP CONSTRAINT "FK_4c7308e3f0be4a354dd19e29617";
        `);

        // Eliminar las columnas
        await queryRunner.query(`
            ALTER TABLE "funnels_library" DROP COLUMN "config_step_id";
        `);
        await queryRunner.query(`
            ALTER TABLE "config_planner" DROP COLUMN "funnelLibrary_id";
        `);
        await queryRunner.query(`
            ALTER TABLE "funnels" DROP COLUMN "funnelLibrary_id";
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE "funnels_library" ADD COLUMN "config_step_id" uuid;
        `);
        await queryRunner.query(`
            ALTER TABLE "config_planner" ADD COLUMN "funnelLibrary_id" uuid;
        `);
        await queryRunner.query(`
            ALTER TABLE "funnels" ADD COLUMN "funnelLibrary_id" uuid;
        `);

        // Restaurar las constraints foráneas eliminadas
        await queryRunner.query(`
            ALTER TABLE "funnels_library" ADD CONSTRAINT "FK_38777a64969bf4a2ccc7bd36f38" FOREIGN KEY ("config_step_id") REFERENCES "config_planner"("_id") ON DELETE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "config_planner" ADD CONSTRAINT "FK_260ff358f68ff0e370346320010" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "funnels" ADD CONSTRAINT "FK_4c7308e3f0be4a354dd19e29617" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE;
        `);

        const funnelsLibraryRecords = await queryRunner.query(`SELECT * FROM "funnels_archive"`);

        for (const record of funnelsLibraryRecords) {

            await queryRunner.query(
                `UPDATE funnels_library
            SET config_step_id = $1
            WHERE "_id" = $2`,
                [record.config_step_id, record.funnelLibrary_id]
            );
            await queryRunner.query(
                `UPDATE config_planner
            SET "funnelLibrary_id" = $1
            WHERE _id = $2`,
                [record.funnelLibrary_id, record.config_step_id]
            );
              await queryRunner.query(
                `UPDATE funnels
            SET "funnelLibrary_id" = $1
            WHERE "archives_id" = $2`,
                [record.funnelLibrary_id, record._id]
            );

        }

         // Eliminar las restricciones foráneas en 'funnels' y 'config_planner'
        await queryRunner.query(`
            ALTER TABLE "funnels" DROP CONSTRAINT "FK_4Ab5oVyg8MmhfgBk9dvNEE8tV1D";
        `);
        await queryRunner.query(`
            ALTER TABLE "config_planner" DROP CONSTRAINT "FK_Fvqym4kb4A3FDKMiv1rqpZM7poL";
        `);

        // Eliminar las columnas 'archives_id' en 'funnels' y 'config_planner'
        await queryRunner.query(`
            ALTER TABLE "funnels" DROP COLUMN "archives_id";
        `);
        await queryRunner.query(`
            ALTER TABLE "config_planner" DROP COLUMN "archives_id";
        `);

    }

}
