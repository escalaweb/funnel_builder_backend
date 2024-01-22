import { Module } from "@nestjs/common";
import { Db_Module } from "../../database/DB.module";
import { PlannerService } from "./services/planner.service";



@Module({
    controllers: [

    ],
    providers: [
        PlannerService
    ],
    imports: [
        Db_Module,
        // Planner_Rel_Module
    ],
    exports: [
        PlannerService
    ]
})
export class Planner_exportModule { }
