import { Module } from "@nestjs/common";
import { CommonModule } from "./common/common.module";
import { ConfigProjectModule } from "./config/config.module";
import { AuthModule, FileManagerModule, FunnelLibraryModule, FunnelsModule, PlannerModule, TestModule, UsersModule } from "./modules";
import { CustomizeProcessModule } from "./modules/customize-process/customize-process.module";


@Module({
    imports: [
        ConfigProjectModule,
        CommonModule,
        AuthModule,
        // FileManagerModule,
        CustomizeProcessModule,
        FunnelLibraryModule,
        FunnelsModule,
        UsersModule,
        TestModule,
        PlannerModule,
        // Rel_Index_Module
    ],
})
export class AppModule { }

