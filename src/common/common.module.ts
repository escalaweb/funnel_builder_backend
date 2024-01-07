import { Module, Global } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DateProcessService, ProcessDataService, _HttpService } from './adapters';
import { HttpExceptionFilter } from './filters';
import { MiddlewareModule } from './middlewares/middleware.module';
import { CommonService, ExeptionsHandlersService, _LoggerService } from './services';
import { SocketsGateway } from './sockets/sockets.gateway';
import { SocketsService } from './sockets/sockets.service';
import { HttpModule } from '@nestjs/axios';


@Global()
@Module({
    // controllers: [],
    imports: [
        MiddlewareModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),

    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        CommonService,
        ProcessDataService,
        _HttpService,
        DateProcessService,
        SocketsGateway,
        SocketsService,
        ExeptionsHandlersService,
        _LoggerService

    ],
    exports: [
        CommonService,
        ProcessDataService,
        _HttpService,
        DateProcessService,
        SocketsService,
        _LoggerService,
        ExeptionsHandlersService
    ]
})
export class CommonModule { }
