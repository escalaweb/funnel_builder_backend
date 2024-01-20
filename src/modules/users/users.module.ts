import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { Users_Rel_Module } from './rel.module';
import { UsersService } from './services/users.service';
import { Db_Module } from '../../database/DB.module';


@Module({
    controllers: [UsersController],
    imports: [
        // EntitiesModule,
        Db_Module,
        Users_Rel_Module
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ]

})
export class UsersModule { }
