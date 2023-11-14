import { MigrationInterface, QueryRunner } from "typeorm";

export class TimingMetricsFunnels1699631897253 implements MigrationInterface {
    name = 'TimingMetricsFunnels1699631897253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funnels" ADD "timingMetrics" character varying NOT NULL DEFAULT 'daily'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1699631899907'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1699631899913'`);
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1699631899915'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1699484555709'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1699484555717'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1699484555715'`);
        await queryRunner.query(`ALTER TABLE "funnels" DROP COLUMN "timingMetrics"`);
    }

}
