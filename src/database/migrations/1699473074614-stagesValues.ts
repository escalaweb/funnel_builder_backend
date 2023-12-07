import { MigrationInterface, QueryRunner } from "typeorm"

export class StagesValues1699473074614 implements MigrationInterface {

    name = 'StagesValues1699473074614';

    public async up(queryRunner?: QueryRunner): Promise<void> {
        // Renombrar columna `value` a `metrics` y cambiar su estructura
        // Actualizar la estructura de la columna `metrics` para que el contenido anterior sea ahora `metrics.goal_value.value`

        console.log('hola');

        await queryRunner.query(`
      UPDATE "stages_funnel"
    SET "value" = jsonb_build_object(
    'income_value', 0,
    'current_value', 0,
    'goal_value', "value"
  )
    `);

        await queryRunner.query(`
      ALTER TABLE "stages_funnel"
      RENAME COLUMN "value" TO "metrics"
    `);

        await queryRunner.query(`UPDATE "stages_funnel" SET "__v" = 1 WHERE "__v" IS NOT NULL`);

    }

    public async down(queryRunner?: QueryRunner): Promise<void> {
        // Extraer el valor de `metrics.goal_value.value` y revertir a la estructura original
        await queryRunner.query(`
      UPDATE "stages_funnel"
      SET "metrics" = ("metrics"->'goal_value')::jsonb
    `);

        // Renombrar columna `metrics` de vuelta a `value`
        await queryRunner.query(`
      ALTER TABLE "stages_funnel"
      RENAME COLUMN "metrics" TO "value"
    `);

        await queryRunner.query(`UPDATE "stages_funnel" SET "__v" = 0 WHERE "__v" = 1`);

    }

}


