import { Module } from "@nestjs/common";
import { CommonModule } from "./common/common.module";
import { ConfigProjectModule } from "./config/config.module";
import { AuthModule, FileManagerModule, FunnelLibraryModule, FunnelsModule, PlannerModule, TestModule, UsersModule } from "./modules";



@Module({
    imports: [
        ConfigProjectModule,
        CommonModule,
        AuthModule,
        // FileManagerModule,
        // FunnelLibraryModule,
        // FunnelsModule,
        // PlannerModule,
        UsersModule,
        TestModule,
    ],
})
export class AppModule { }

