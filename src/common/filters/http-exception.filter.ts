import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { _responseMessage_I, _response_I } from '../interfaces';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(
    ) {

    }

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const path: string = request.url;

        let error: any = null;

        console.log('exception.cause', exception);

        if (exception.cause?.stack) {
            error = exception.cause.stack;
        } else if (exception.cause) {
            error = exception.cause;
        }

        const message: _responseMessage_I[] = exception['response'].message;

        if (error != null) {
            const logger = new Logger(`Exception filter - Status: ${status} - Path: ${path}`);
            logger.error(exception.cause);
        }else if( exception['response'].message ){
            const logger = new Logger(`Exception filter - Status: ${status} - Path: ${path}`);
            logger.error(exception['response'].message);
        }

        const _response: _response_I<any> = {
            ok: false,
            statusCode: status,
            path: path,
            data: null,
            message: message,
            err: error
        }

        response
            .status(status)
            .json(_response);

    }


}
