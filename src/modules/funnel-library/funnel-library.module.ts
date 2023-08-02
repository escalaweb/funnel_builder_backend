import { Module } from '@nestjs/common';
import { FunnelLibraryService } from './services/funnel-library.service';
import { FunnelLibraryController } from './controllers/funnel-library.controller';
import { FunnelLibrarySchema } from './models/schemas/funnelLibrary.schema';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UsersModule } from '../users/users.module';
import { ModelRegistry } from '../../common/helpers/dynamoose.helper.service';



@Module({
    controllers: [FunnelLibraryController],
    providers: [FunnelLibraryService],
    imports: [

        DynamooseModule.forFeature([
            {
                name: 'FunnelLibrary',
                schema: FunnelLibrarySchema,
            },
        ]),
        UsersModule

    ],
    exports: [
        DynamooseModule,
        FunnelLibraryService
    ]
})
export class FunnelLibraryModule { }
