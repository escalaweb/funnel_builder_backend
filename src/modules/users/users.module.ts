import { Module } from '@nestjs/common';


import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './models/schemas/users.schema';
import { ModelRegistry } from '../../common/helpers/dynamoose.helper.service';


@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'Users',
                schema: UserSchema,
            },

        ]),

    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService,
        DynamooseModule
    ]

})
export class UsersModule { }
