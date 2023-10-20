import { Module, forwardRef } from "@nestjs/common";
import { FunnelLibraryModule, FunnelsModule, UsersModule } from "../..";
import { PlannerModule } from "../planner.module";
import { Rel_Planner_Funnels_Library_Users_Service } from "./rel-planner_funnels_users.service";
import { CustomizeProcessModule } from "../../customize-process/customize-process.module";
import { EntitiesModule } from "../../../database/entities/entities.module";





@Module({
    providers: [
        Rel_Planner_Funnels_Library_Users_Service
    ],
    imports: [
        // UsersModule,
        EntitiesModule,
        forwardRef(() => UsersModule),
        forwardRef(() => PlannerModule),
        FunnelLibraryModule,
        FunnelsModule,
    ],
    exports: [
        Rel_Planner_Funnels_Library_Users_Service
    ]
})
export class Rel_Planner_Funnels_Library_Users_Module { }