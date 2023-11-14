import { Module } from "@nestjs/common";
import { FunnelLibraryModule } from "../funnel-library/funnel-library.module";
import { UsersModule } from "../users/users.module";


@Module({
    controllers: [],
    imports: [
        FunnelLibraryModule,
        UsersModule
    ],
    providers: [

    ],
    exports: [
        FunnelLibraryModule,
        UsersModule
    ]
})
export class Funnels_Rel_Module { }