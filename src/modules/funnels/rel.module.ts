import { Module } from "@nestjs/common";
import { FunnelLibraryModule } from "../funnel-library/funnel-library.module";
import { UsersModule } from "../users/users.module";
import { AdminInternalModule } from "../admin_internal/admin_internal.module";


@Module({
    controllers: [],
    imports: [
        AdminInternalModule,
        FunnelLibraryModule,
        UsersModule,
    ],
    providers: [

    ],
    exports: [
        FunnelLibraryModule,
        AdminInternalModule,
        UsersModule
    ]
})
export class Funnels_Rel_Module { }
