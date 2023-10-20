import { Module } from '@nestjs/common';


import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { EntitiesModule } from '../../database/entities/entities.module';




@Module({
    controllers: [UsersController],
    imports: [

        EntitiesModule

    ],
    providers: [

        UsersService

    ],
    exports: [

        UsersService,

    ]

})
export class UsersModule { }
