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
    PermisionsRequestsModule,
    PlannerModule,
    TestModule,
    UsersModule
} from "./modules";

@Module({
    imports: [
        AdminInternalModule,
        AuthModule,
        CommonModule,
        ConfigProjectModule,
        CustomizeProcessModule,
        FunnelArchivesModule,
        FunnelLibraryModule,
        FunnelsModule,
        LibraryPermisionsModule,
        PermisionsRequestsModule,
        PlannerModule,
        TestModule,
        UsersModule,
    ],
})
export class AppModule { }

