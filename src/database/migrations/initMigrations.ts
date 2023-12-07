import { MigrationFunctionsModel_I, MigrationModel_I } from "../interfaces/_migrationModel.interface";


import {
    StagesValues1699473074614,
    StagesPorcents1699473125002,
    TimingMetricsFunnels1699631897253,
    PermisionsToShare1701888175900,
    InitPermisions1701898729627
    // InitPermisions1701890873025,
} from "./index"

// export const _globalMigs: MigrationModel_I[] = [
//     {
//         name: 'StagesValues1699473074614',
//         up: [
//             `UPDATE "stages_funnel"
//                   SET "value" = jsonb_build_object(
//                   'income_value', 0,
//                   'current_value', 0,
//                   'goal_value', "value"
//                 )`,
//             `
//                   ALTER TABLE "stages_funnel"
//                   RENAME COLUMN "value" TO "metrics"
//                 `,
//             `UPDATE "stages_funnel" SET "__v" = 1 WHERE "__v" IS NOT NULL`
//         ],
//         down: [
//             `UPDATE "stages_funnel" SET "metrics" = ("metrics"->'goal_value')::jsonb`,
//             `ALTER TABLE "stages_funnel" RENAME COLUMN "metrics" TO "value"`,
//             `UPDATE "stages_funnel" SET "__v" = 0 WHERE "__v" = 1`
//         ],
//         register: true,
//     },
//     // --------------------------------------------------
//     {
//         name: 'StagesPorcents1699473125002',
//         up: [
//             `UPDATE "funnels" f
//     SET "relations" = (
//       SELECT jsonb_agg(
//         jsonb_build_object(
//           'current_porcent', 0,
//           'income_porcent', 0,
//           'goal_porcent', (value->>'porcent')::numeric
//         )
//       )
//       FROM (
//         SELECT jsonb_array_elements(f."relations") as value
//       ) AS subquery
//     )
//     WHERE f."relations" IS NOT NULL;`,
//             `ALTER TABLE "funnels"
//       RENAME COLUMN "relations" TO "metricsPorcents"`,
//             `UPDATE "funnels" SET "__v" = 1 WHERE "__v" IS NOT NULL`
//         ],
//         down: [
//             `  UPDATE "funnels" f
//     SET "metricsPorcents" = (
//       SELECT jsonb_agg(
//         jsonb_build_object(
//           'porcent', (value->>'goal_porcent')::numeric
//         )
//       )
//       FROM (
//         SELECT jsonb_array_elements(f."metricsPorcents") as value
//       ) AS subquery
//     )
//     WHERE f."metricsPorcents" IS NOT NULL;`,
//             `ALTER TABLE "funnels"
//       RENAME COLUMN "metricsPorcents" TO "relations"`,
//             `UPDATE "funnels" SET "__v" = 0 WHERE "__v" = 1`
//         ],
//         register: true,
//     },
//     // --------------------------------------------------
//     {
//         name: 'TimingMetricsFunnels1699631897253',
//         up: [
//             `ALTER TABLE "funnels" ADD "timingMetrics" character varying NOT NULL DEFAULT 'daily'`
//         ],
//         down: [
//             `ALTER TABLE "funnels" DROP COLUMN "timingMetrics"`
//         ],
//         register: true,
//     },
//     // --------------------------------------------------
//     {
//         name: 'PermisionsToShare1701888175900',
//         up: [
//             `CREATE TABLE "library_permisions" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "__v" smallint NOT NULL DEFAULT '0', "elementsEffect" character varying NOT NULL DEFAULT 'all', "permisionType" smallint DEFAULT '0', "updatedAt" character varying NOT NULL DEFAULT '0', "funnelLibrary_id" uuid, "user_id" uuid, CONSTRAINT "PK_319445c0c4f76ea3214d06128a3" PRIMARY KEY ("_id"))`,
//             `ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1701888178549'`,
//             `ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1701888178556'`,
//             `ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1701888178557'`,
//             `ALTER TABLE "library_permisions" ADD CONSTRAINT "FK_399db15e3e7f9ff7302a541b483" FOREIGN KEY ("funnelLibrary_id") REFERENCES "funnels_library"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
//             `ALTER TABLE "library_permisions" ADD CONSTRAINT "FK_d5225431cadc32689ec3be15ec0" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
//         ],
//         down: [
//             `ALTER TABLE "library_permisions" DROP CONSTRAINT "FK_d5225431cadc32689ec3be15ec0"`,
//             `ALTER TABLE "library_permisions" DROP CONSTRAINT "FK_399db15e3e7f9ff7302a541b483"`,
//             `ALTER TABLE "funnels" ALTER COLUMN "createdAt" SET DEFAULT '1699484555709'`,
//             `ALTER TABLE "funnels_library" ALTER COLUMN "createdAt" SET DEFAULT '1699484555717'`,
//             `ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '1699484555715'`,
//             `DROP TABLE "library_permisions"`,
//         ],
//         register: true,
//     }
// ];

export const _globalMigs: MigrationFunctionsModel_I[] = [
    {
        name: 'StagesValues1699473074614',
        mig: new StagesValues1699473074614()
    },
    {
        name: 'StagesPorcents1699473125002',
        mig: new StagesPorcents1699473125002()
    },
    {
        name: 'TimingMetricsFunnels1699631897253',
        mig: new TimingMetricsFunnels1699631897253()
    },
    {
        name: 'PermisionsToShare1701888175900',
        mig: new PermisionsToShare1701888175900()
    },
    {
        name: 'InitPermisions1701898729627',
        mig: new InitPermisions1701898729627()
    }
]
// console.log(_globalMigs[0].mig.up());