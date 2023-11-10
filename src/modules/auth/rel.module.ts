import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";

@Module({
    controllers: [],
    imports: [
        UsersModule
    ],
    providers: [

    ],
    exports: [
        UsersModule
    ]
})
export class Auth_Rel_Module { }
