import { MigrationModel_I } from "../../../../database/interfaces/_migrationModel.interface";



export const Funnel_Migs: MigrationModel_I[] = [
    {
        name: 'StagesValues1699473074614',
        up: [
            `UPDATE "stages_funnel"
                  SET "value" = jsonb_build_object(
                  'income_value', 0,
                  'current_value', 0,
                  'goal_value', "value"
                )`,
            `
                  ALTER TABLE "stages_funnel"
                  RENAME COLUMN "value" TO "metrics"
                `,
            `UPDATE "stages_funnel" SET "__v" = 1 WHERE "__v" IS NOT NULL`
        ],
        down: [
            `UPDATE "stages_funnel" SET "metrics" = ("metrics"->'goal_value')::jsonb`,
            `ALTER TABLE "stages_funnel" RENAME COLUMN "metrics" TO "value"`,
            `UPDATE "stages_funnel" SET "__v" = 0 WHERE "__v" = 1`
        ],
        register: true,
        pos: 0,
    },
    {
        name: 'StagesPorcents1699473125002',
        up: [
            `UPDATE "funnels" f
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
    WHERE f."relations" IS NOT NULL;`,
            `ALTER TABLE "funnels"
      RENAME COLUMN "relations" TO "metricsPorcents"`,
            `UPDATE "funnels" SET "__v" = 1 WHERE "__v" IS NOT NULL`
        ],
        down: [
            `  UPDATE "funnels" f
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
    WHERE f."metricsPorcents" IS NOT NULL;`,
            `ALTER TABLE "funnels"
      RENAME COLUMN "metricsPorcents" TO "relations"`,
            `UPDATE "funnels" SET "__v" = 0 WHERE "__v" = 1`
        ],
        register: true,
        pos: 1
    },
    {
        name: 'TimingMetricsFunnels1699631897253',
        up: [
            `ALTER TABLE "funnels" ADD "timingMetrics" character varying NOT NULL DEFAULT 'daily'`
        ],
        down: [
           `ALTER TABLE "funnels" DROP COLUMN "timingMetrics"`
        ],
        register: true,
        pos: 2
    }
]
