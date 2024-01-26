import { Module } from "@nestjs/common";
import { FunnelArchivesService } from "./services/funnel_archives.service";
import { Db_Module } from "../../database/DB.module";
import { Planner_exportModule } from "../planner/planner_export.module";


@Module({
    controllers: [
    ],
    imports: [
        Db_Module,
        Planner_exportModule,
    ],
    providers: [
        FunnelArchivesService
    ],
    exports: [
        FunnelArchivesService
    ]
})
export class FunnelArchives_exportModule { }
