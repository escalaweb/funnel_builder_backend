import { Module } from '@nestjs/common';
import { FunnelsService } from './services/funnels.service';
import { FunnelsController } from './controllers/funnels.controller';
import { funnelSchema } from './models/schemas/funnels.schema';
import { DynamooseModule } from 'nestjs-dynamoose';
import { FunnelLibraryModule } from '../funnel-library/funnel-library.module';

@Module({
  controllers: [FunnelsController],
  providers: [FunnelsService],
  imports: [
         DynamooseModule.forFeature([
            {
                name: 'Funnels',
                schema: funnelSchema,
            },
        ]),
        FunnelLibraryModule
  ]
})
export class FunnelsModule {}
