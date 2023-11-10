import { MigrationInterface, QueryRunner } from "typeorm"

export class StagesPorcents1699473125002 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {

  // Actualizar la estructura de la columna `metricsPorcents`
  await queryRunner.query(`
    UPDATE "funnels" f
    SET "relations" = (
      SELECT jsonb_agg(
        jsonb_build_object(
          'current_porcent', 0,
          'income_porcent', 0,
          'goal_porcent', (value->>'porcent')::numeric
        )
      )
      FROM (
        SELECT jsonb_array_elements(f."relations") as value
      ) AS subquery
    )
    WHERE f."relations" IS NOT NULL;
  `);

      // Renombrar columna `relations` a `metricsPorcents`

    await queryRunner.query(`
      ALTER TABLE "funnels"
      RENAME COLUMN "relations" TO "metricsPorcents"
    `);

    await queryRunner.query(`UPDATE "funnels" SET "__v" = 1 WHERE "__v" IS NOT NULL`);

}

   public async down(queryRunner: QueryRunner): Promise<void> {
  // Restaurar la estructura original de la columna `relations`
  await queryRunner.query(`
    UPDATE "funnels" f
    SET "metricsPorcents" = (
      SELECT jsonb_agg(
        jsonb_build_object(
          'porcent', (value->>'goal_porcent')::numeric
        )
      )
      FROM (
        SELECT jsonb_array_elements(f."metricsPorcents") as value
      ) AS subquery
    )
    WHERE f."metricsPorcents" IS NOT NULL;
  `);

  // Renombrar columna `metricsPorcents` de nuevo a `relations`
    await queryRunner.query(`
      ALTER TABLE "funnels"
      RENAME COLUMN "metricsPorcents" TO "relations"
    `);

    await queryRunner.query(`UPDATE "funnels" SET "__v" = 0 WHERE "__v" = 1`);

}

}
