import { Module } from "@nestjs/common";
import { CommonModule } from "./common/common.module";
import { ConfigProjectModule } from "./config/config.module";
import {
    AdminInternalModule,
    AuthModule,
    FunnelLibraryModule,
    FunnelsModule,
    PlannerModule,
    TestModule,
    UsersModule
} from "./modules";

import { CustomizeProcessModule } from "./modules/customize-process/customize-process.module";



@Module({
    imports: [
        ConfigProjectModule,
        CommonModule,
        AuthModule,
        CustomizeProcessModule,
        FunnelLibraryModule,
        FunnelsModule,
        UsersModule,
        TestModule,
        PlannerModule,
        AdminInternalModule,
    ],
})
export class AppModule { }

