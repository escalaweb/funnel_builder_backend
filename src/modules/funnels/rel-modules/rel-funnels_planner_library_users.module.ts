import { Module, forwardRef } from "@nestjs/common";
import { Rel_Funnels_Planner_Library_Users_Service } from "./rel-funnels_planner_library_users.service";
import { UsersModule } from "../../users/users.module";
import { FunnelLibraryModule } from "../../funnel-library/funnel-library.module";
import { FunnelsModule, PlannerModule } from "../..";
import { CustomizeProcessModule } from "../../customize-process/customize-process.module";


@Module({
    providers: [Rel_Funnels_Planner_Library_Users_Service],
    imports: [
        // FunnelsModule,
        forwardRef(() => FunnelsModule),
        forwardRef(() => PlannerModule),
        UsersModule,
        FunnelLibraryModule,
        CustomizeProcessModule
    ],
    exports: [
        Rel_Funnels_Planner_Library_Users_Service
    ]
})
export class Rel_Funnels_Planner_Library_Users_Module { }