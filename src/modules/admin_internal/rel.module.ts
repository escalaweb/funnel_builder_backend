import { Module } from "@nestjs/common";
import { FunnelLibraryModule } from "../funnel-library/funnel-library.module";
import { UsersModule } from "../users/users.module";


@Module({
    controllers: [],
    imports: [
        UsersModule,
        FunnelLibraryModule,

    ],
    providers: [

    ],
    exports: [
        UsersModule,
        FunnelLibraryModule,

    ]
})
export class Admin_Internal_Rel_Module { }
