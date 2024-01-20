import { MigrationInterface, QueryRunner } from "typeorm";

export class ArchiveStructure1705681873345 implements MigrationInterface {
    name = 'ArchiveStructure1705681873345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funnels" DROP CONSTRAINT "FK_4c7308e3f0be4a354dd19e29617"`);
        await queryRunner.query(`ALTER TABLE "config_planner" DROP CONSTRAINT "FK_260ff358f68ff0e370346320010"`);
        await queryRunner.query(`ALTER TABLE "funnels_library" DROP CONSTRAINT "FK_38777a64969bf4a2ccc7bd36f38"`);
        await queryRunner.query(`ALTER TABLE "funnels" RENAME COLUMN "funnelLibrary_id" TO "archives_id"`);
        await queryRunner.query(`ALTER TABLE "config_planner" RENAME COLUMN "funnelLibrary_id" TO "archives_id"`);
        await queryRunner.query(`ALTER TABLE "config_planner" RENAME CONSTRAINT "UQ_260ff358f68ff0e370346320010" TO "UQ_4cd98327eb2e4620249d55b9bd9"`);
        // await queryRunner.query(`CREATE TABLE "funnels_archive" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "__v" smallint NOT NULL DEFAULT '0', "name" character varying NOT NULL, "createdAt" character varying NOT NULL DEFAULT '1705681876127', "updatedAt" character varying NOT NULL DEFAULT '0', "user_id" uuid, "funnelLibrary_id" uuid, "config_step_id" uuid, CONSTRAINT "REL_98edc02d8719ae12c7153caef7" UNIQUE ("config_step_id"), CONSTRAINT "PK_2545e09f664ccbca904c075a813" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "funnels_library" DROP CONSTRAINT "UQ_38777a64969bf4a2ccc7bd36f38"`);
        await queryRunner.query(`ALTER TABLE "funnels_library" DROP COLUMN "config_step_id"`);
        await queryRunner.query(`ALTER TABLE "library_permisions" ALTER COLUMN "permisionType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1705681876113'`);
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1705681876124'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1705681876127'`);
        await queryRunner.query(`ALTER TABLE "funnels" ADD CONSTRAINT "FK_99f4f565501456422bc0b26ac7f" FOREIGN KEY ("archives_id") REFERENCES "funnels_archive"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "config_planner" ADD CONSTRAINT "FK_4cd98327eb2e4620249d55b9bd9" FOREIGN KEY ("archives_id") REFERENCES "funnels_archive"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" ADD CONSTRAINT "FK_e416f4f53006e65cc24ac29452c" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" ADD CONSTRAINT "FK_f5fea23c980b09817cd6bcda6c3" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" ADD CONSTRAINT "FK_98edc02d8719ae12c7153caef7d" FOREIGN KEY ("config_step_id") REFERENCES "config_planner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funnels_archive" DROP CONSTRAINT "FK_98edc02d8719ae12c7153caef7d"`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" DROP CONSTRAINT "FK_f5fea23c980b09817cd6bcda6c3"`);
        await queryRunner.query(`ALTER TABLE "funnels_archive" DROP CONSTRAINT "FK_e416f4f53006e65cc24ac29452c"`);
        await queryRunner.query(`ALTER TABLE "config_planner" DROP CONSTRAINT "FK_4cd98327eb2e4620249d55b9bd9"`);
        await queryRunner.query(`ALTER TABLE "funnels" DROP CONSTRAINT "FK_99f4f565501456422bc0b26ac7f"`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1704696752792'`);
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1704696752773'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1704696752780'`);
        await queryRunner.query(`ALTER TABLE "library_permisions" ALTER COLUMN "permisionType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ADD "config_step_id" uuid`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ADD CONSTRAINT "UQ_38777a64969bf4a2ccc7bd36f38" UNIQUE ("config_step_id")`);
        await queryRunner.query(`DROP TABLE "funnels_archive"`);
        await queryRunner.query(`ALTER TABLE "config_planner" RENAME CONSTRAINT "UQ_4cd98327eb2e4620249d55b9bd9" TO "UQ_260ff358f68ff0e370346320010"`);
        await queryRunner.query(`ALTER TABLE "config_planner" RENAME COLUMN "archives_id" TO "funnelLibrary_id"`);
        await queryRunner.query(`ALTER TABLE "funnels" RENAME COLUMN "archives_id" TO "funnelLibrary_id"`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ADD CONSTRAINT "FK_38777a64969bf4a2ccc7bd36f38" FOREIGN KEY ("config_step_id") REFERENCES "config_planner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "config_planner" ADD CONSTRAINT "FK_260ff358f68ff0e370346320010" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "funnels" ADD CONSTRAINT "FK_4c7308e3f0be4a354dd19e29617" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
