import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { FunnelLibraryModule } from "../funnel-library/funnel-library.module";


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
export class LibraryPermisions_Rel_Module { }
