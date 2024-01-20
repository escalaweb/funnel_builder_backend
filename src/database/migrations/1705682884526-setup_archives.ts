import { MigrationInterface, QueryRunner } from "typeorm"

export class SetupArchives1705682884526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

            await queryRunner.query(`CREATE TABLE "funnels_archive" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "__v" smallint NOT NULL DEFAULT '0', "name" character varying NOT NULL, "createdAt" character varying NOT NULL DEFAULT '1705681876127', "updatedAt" character varying NOT NULL DEFAULT '0', "user_id" uuid, "funnelLibrary_id" uuid, "config_step_id" uuid, CONSTRAINT "REL_98edc02d8719ae12c7153caef7" UNIQUE ("config_step_id"), CONSTRAINT "PK_2545e09f664ccbca904c075a813" PRIMARY KEY ("_id"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
