import { Module } from '@nestjs/common';
import { ProcessPaginateMiddleware } from './middleware.index';

import {  RequestMethod, MiddlewareConsumer } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [ProcessPaginateMiddleware],
})
export class MiddlewareModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(ProcessPaginateMiddleware)
          .forRoutes({ path: '/*', method: RequestMethod.GET });
      }

}
