import { MigrationInterface, QueryRunner } from "typeorm";

export class ActBase1704696750348 implements MigrationInterface {
    name = 'ActBase1704696750348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1704696752773'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1704696752780'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" DROP CONSTRAINT "FK_85b4cdfb7c05ffabdc3b6e838b6"`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1704696752792'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ADD CONSTRAINT "FK_85b4cdfb7c05ffabdc3b6e838b6" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funnels_library" DROP CONSTRAINT "FK_85b4cdfb7c05ffabdc3b6e838b6"`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1704637303523'`);
        await queryRunner.query(`ALTER TABLE "funnels_library" ADD CONSTRAINT "FK_85b4cdfb7c05ffabdc3b6e838b6" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1704637303517'`);
        await queryRunner.query(`ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1704637303523'`);
    }

}
