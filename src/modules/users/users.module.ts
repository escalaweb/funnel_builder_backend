import { Module } from '@nestjs/common';


import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { USER_ENTITIES_MODULE } from './entities/entities.module';


@Module({
    controllers: [UsersController],
    imports: [

        USER_ENTITIES_MODULE,

    ],
    providers: [

        UsersService

    ],
    exports: [

        USER_ENTITIES_MODULE,
        UsersService,

    ]

})
export class UsersModule { }
