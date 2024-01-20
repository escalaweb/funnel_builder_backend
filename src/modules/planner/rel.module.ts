import { Module } from "@nestjs/common";
import { FunnelLibraryModule } from "../funnel-library/funnel-library.module";

@Module({
    controllers: [],
    imports: [
        FunnelLibraryModule
    ],
    providers: [

    ],
    exports: [
        FunnelLibraryModule

    ]
})
export class Planner_Rel_Module { }
