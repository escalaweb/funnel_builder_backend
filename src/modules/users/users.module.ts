import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { EntitiesModule } from '../../database/entities/entities.module';
import { UsersService } from './services/users.service';
import { Users_Rel_Module } from './rel.module';


@Module({
    controllers: [UsersController],
    imports: [
        EntitiesModule,
        Users_Rel_Module
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService,
    ]

})
export class UsersModule { }
