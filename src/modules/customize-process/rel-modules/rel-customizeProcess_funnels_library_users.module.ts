import { Module, forwardRef } from "@nestjs/common";
import { FunnelLibraryModule } from "../../funnel-library/funnel-library.module";
import { UsersModule } from "../../users/users.module";
import { Rel_CustomizeProcess_Funnels_Library_Users_Service } from "./rel-customizeProcess_funnels_library_users.service";
import { FunnelsModule } from "../../funnels/funnels.module";
import { CustomizeProcessModule } from "../customize-process.module";
import { EntitiesModule } from "../../../database/entities/entities.module";




@Module({
    providers: [Rel_CustomizeProcess_Funnels_Library_Users_Service],
    imports: [
        EntitiesModule,
        forwardRef(() => CustomizeProcessModule),
        forwardRef(() => FunnelsModule),
        // FunnelsModule,
        UsersModule,
        FunnelLibraryModule
    ],
    exports: [
        Rel_CustomizeProcess_Funnels_Library_Users_Service
    ]
})
export class Rel_CustomizeProcess_Funnels_Library_Users_Module { }