import { Module } from "@nestjs/common";
import { UsersService } from './services/users.service';
import { Db_Module } from "../../database/entities";

@Module({
    controllers: [],
    imports: [
        Db_Module,
    ],
    providers: [

    ],
    exports: [

    ]
})
export class Users_Rel_Module { }
