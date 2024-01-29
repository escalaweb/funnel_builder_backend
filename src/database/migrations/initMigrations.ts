import { MigrationFunctionsModel_I } from "../interfaces/_migrationModel.interface";


import {
    StagesValues1699473074614,
    StagesPorcents1699473125002,
    TimingMetricsFunnels1699631897253,
    PermisionsToShare1701888175900,
    InitPermisions1701898729627,
    ActBase1704696750348,
    SetupArchives1705682884526,
    ReformatDataByArchives1705794742714,
    PermisionsRequestsTable1706539980970

    // ArchiveStructure1705681873345
} from "./index"


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
    },
    {
        name: 'ActBase1704696750348',
        mig: new ActBase1704696750348()
    },
    {
        name: 'SetupArchives1705682884526',
        mig: new SetupArchives1705682884526()
    },
    {
        name: 'ReformatDataByArchives1705794742714',
        mig: new ReformatDataByArchives1705794742714()
    },
    {
        name: 'PermisionsRequestsTable1706539980970',
        mig: new PermisionsRequestsTable1706539980970()
    },


]