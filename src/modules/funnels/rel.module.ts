import { Module } from "@nestjs/common";
import { Users_Rel_Module } from "../users/rel.module";
import { Db_Module } from "../../database/DB.module";
import { Admin_Internal_Rel_Module } from "../admin_internal/rel.module";
import { FunnelLibrary_Rel_Module } from "../funnel-library/rel.module";
import { FunnelsService } from "./services";
import { UsersModule } from "../users/users.module";
import { FunnelLibraryModule } from "../funnel-library/funnel-library.module";
import { AdminInternalModule } from "../admin_internal/admin_internal.module";


@Module({
    controllers: [],
    imports: [
        UsersModule,
        AdminInternalModule,
        FunnelLibraryModule
    ],
    providers: [

    ],
    exports: [

        UsersModule,
        AdminInternalModule,
        FunnelLibraryModule
    ]
})
export class Funnels_Rel_Module {  }
