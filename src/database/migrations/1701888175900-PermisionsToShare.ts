import { MigrationInterface, QueryRunner } from "typeorm";



export class PermisionsToShare1701888175900 implements MigrationInterface {
    name = 'PermisionsToShare1701888175900'

    public async up(queryRunner?: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE "library_permisions" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "__v" smallint NOT NULL DEFAULT '0', "elementsEffect" character varying NOT NULL DEFAULT 'all', "permisionType" smallint DEFAULT '0', "updatedAt" character varying NOT NULL DEFAULT '0', "funnelLibrary_id" uuid, "user_id" uuid, CONSTRAINT "PK_319445c0c4f76ea3214d06128a3" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1701888178549'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1701888178556'`);
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1701888178557'`);
        await queryRunner.query(`ALTER TABLE "library_permisions" ADD CONSTRAINT "FK_399db15e3e7f9ff7302a541b483" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "library_permisions" ADD CONSTRAINT "FK_d5225431cadc32689ec3be15ec0" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);

    }

    public async down(queryRunner?: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "library_permisions" DROP CONSTRAINT "FK_d5225431cadc32689ec3be15ec0"`);
        await queryRunner.query(`ALTER TABLE "library_permisions" DROP CONSTRAINT "FK_399db15e3e7f9ff7302a541b483"`);
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1699484555709'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1699484555717'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1699484555715'`);
        await queryRunner.query(`DROP TABLE "library_permisions"`);

    }

}
