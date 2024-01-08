import { Module, forwardRef } from "@nestjs/common";
import { AdminInternalModule } from "../admin_internal/admin_internal.module";
import { FunnelLibraryModule } from "../funnel-library/funnel-library.module";
import { UsersModule } from "../users/users.module";


@Module({
    controllers: [],
    imports: [
        FunnelLibraryModule,
        AdminInternalModule,
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
export class Funnels_Rel_Module {}
