import { MigrationInterface, QueryRunner } from "typeorm";

export class First1695063026838 implements MigrationInterface {
    name = 'First1695063026838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1695063029237'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1695063029243'`);
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1695063029244'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1695052838380'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1695052838386'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1695052838386'`);
    }

}
