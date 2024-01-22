import { MigrationInterface, QueryRunner } from "typeorm"


export class SetupArchives1705682884526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Crear la tabla funnels_archive
        await queryRunner.query(`
            CREATE TABLE "funnels_archive" (
                "_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" varchar NOT NULL,
                "createdAt" varchar NOT NULL DEFAULT '1705681876127',
                "updatedAt" varchar NOT NULL DEFAULT '0',
                "user_id" uuid,
                "funnelLibrary_id" uuid,
                "config_step_id" uuid,
                "__v" smallint NOT NULL DEFAULT '0',
                PRIMARY KEY ("_id")
            );
        `);

        // Establecer las relaciones foráneas
        await queryRunner.query(`ALTER TABLE "funnels_archive" ADD CONSTRAINT "UQ_98edc02d8719ae12c7153caef7d" UNIQUE ("config_step_id")`);

        await queryRunner.query(`ALTER TABLE "funnels_archive" ADD CONSTRAINT "FK_e416f4f53006e65cc24ac29452c" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" ADD CONSTRAINT "FK_f5fea23c980b09817cd6bcda6c3" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" ADD CONSTRAINT "FK_98edc02d8719ae12c7153caef7d" FOREIGN KEY ("config_step_id") REFERENCES "config_planner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar las restricciones foráneas
        await queryRunner.query(`ALTER TABLE "funnels_archive" DROP CONSTRAINT "FK_e416f4f53006e65cc24ac29452c"`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" DROP CONSTRAINT "FK_f5fea23c980b09817cd6bcda6c3"`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" DROP CONSTRAINT "FK_98edc02d8719ae12c7153caef7d"`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" DROP CONSTRAINT "UQ_98edc02d8719ae12c7153caef7d"`);

        // Eliminar la tabla funnels_archive
        await queryRunner.query(`DROP TABLE "funnels_archive"`);
    }


}
