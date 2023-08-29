import { Module } from '@nestjs/common';


import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { USER_ENTITIES_MODULE } from './models/entities/entities.module';


@Module({
    imports: [
        // DynamooseModule.forFeature([
        //     {
        //         name: 'Users',
        //         schema: UserSchema,
        //     },

        // ]),

        // USER_ENTITIES_MODULE,

    ],
    // controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService,
        // USER_ENTITIES_MODULE
        // DynamooseModule
    ]

})
export class UsersModule { }
