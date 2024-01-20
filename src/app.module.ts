import { Module } from "@nestjs/common";
import { CommonModule } from "./common/common.module";
import { ConfigProjectModule } from "./config/config.module";

import {
    AdminInternalModule,
    AuthModule,
    CustomizeProcessModule,
    FunnelArchivesModule,
    FunnelLibraryModule,
    FunnelsModule,
    LibraryPermisionsModule,
    PlannerModule,
    TestModule,
    UsersModule
} from "./modules";



@Module({
    imports: [
        ConfigProjectModule,
        CommonModule,
        AuthModule,
        UsersModule,
        CustomizeProcessModule,
        FunnelLibraryModule,
        FunnelsModule,
        TestModule,
        PlannerModule,
        AdminInternalModule,
        LibraryPermisionsModule,
        FunnelArchivesModule,
    ],
})
export class AppModule { }

