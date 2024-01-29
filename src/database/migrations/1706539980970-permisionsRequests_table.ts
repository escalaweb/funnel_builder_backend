import { MigrationInterface, QueryRunner } from "typeorm";

export class PermisionsRequestsTable1706539980970 implements MigrationInterface {
    name = 'PermisionsRequestsTable1706539980970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permisions_requests" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "__v" smallint NOT NULL DEFAULT '0', "createdAt" character varying NOT NULL DEFAULT '1706539983691', "updatedAt" character varying NOT NULL DEFAULT '0', "answered" boolean NOT NULL DEFAULT false, "funnelLibrary_id" uuid, "requested_by" uuid, "served_by" uuid, CONSTRAINT "PK_2e074a1ee06f137d7f62ef55065" PRIMARY KEY ("_id"))`);

        await queryRunner.query(`ALTER TABLE "library_permisions" ALTER COLUMN "permisionType" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "permisions_requests" ADD CONSTRAINT "FK_58184fa5c338902afe8e4c14cac" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permisions_requests" ADD CONSTRAINT "FK_8ade8d3f588e053a993024bfa6c" FOREIGN KEY ("requested_by") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permisions_requests" ADD CONSTRAINT "FK_9a25b0cfb2c13aef3a3ba2904d5" FOREIGN KEY ("served_by") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permisions_requests" DROP CONSTRAINT "FK_9a25b0cfb2c13aef3a3ba2904d5"`);
        await queryRunner.query(`ALTER TABLE "permisions_requests" DROP CONSTRAINT "FK_8ade8d3f588e053a993024bfa6c"`);
        await queryRunner.query(`ALTER TABLE "permisions_requests" DROP CONSTRAINT "FK_58184fa5c338902afe8e4c14cac"`);
        await queryRunner.query(`ALTER TABLE "library_permisions" ALTER COLUMN "permisionType" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "permisions_requests"`);
    }

}
