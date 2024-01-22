import { Module, forwardRef } from "@nestjs/common";
import { PlannerModule } from "../planner/planner.module";


@Module({
    controllers: [],
    imports: [
        // Planner_Rel_Module,
        // PlannerModule
        forwardRef( () => PlannerModule )
    ],
    providers: [

    ],
    exports: [
        PlannerModule
        // forwardRef( () => PlannerModule )
    ]
})
export class FunnelLibrary_Rel_Module { }
