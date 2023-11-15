import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigProjectService } from '../../config/config.service';
import { _Configuration_Keys } from '../../config/config.keys';
import { AuthPayload_I } from '../../modules/auth/interfaces';

export interface LoggModel<T = any> {
    // dateStamp: string;
    message: string;
    response: {
        body?: T;
        user?: AuthPayload_I;
    };
    context?: string;
    trace?: any;
    type?: 'log' | 'error' | 'warn' | 'debug' | 'verbose';
}


@Injectable({ scope: Scope.DEFAULT })
export class _LoggerService implements LoggerService {

    private readonly logger: winston.Logger;

    constructor(
        private readonly _ConfigProjectService: ConfigProjectService
    ) {

        let aux_transports: any[] = [
            new winston.transports.Console()
        ];

        if (this._ConfigProjectService._get(_Configuration_Keys.NODE_ENV) === 'development') {
            aux_transports.push(new winston.transports.File({ filename: 'debug.log' }));
        }

        this.logger = winston.createLogger({
            level: 'debug',
            // format: winston.format.splat(),
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] - ${level}: ${message}`;
                })
            ),
            transports: aux_transports
        });

    }

    log(LoggModel: LoggModel) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.log(a);
        a += (LoggModel.response) ? ` - Resp: ${JSON.stringify(LoggModel.response)}` : '';

        this.logger.info(a);
    }

    error(LoggModel: LoggModel) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.error( a, { ...LoggModel.trace } );
        a += (LoggModel.response) ? ` - Resp: ${JSON.stringify(LoggModel.response)}` : '';


        this.logger.error(a, { ...LoggModel.trace });
    }

    warn(LoggModel: LoggModel) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.warn(a);
        a += (LoggModel.response) ? ` - Resp: ${JSON.stringify(LoggModel.response)}` : '';


        this.logger.warn(a);
    }

    debug(LoggModel: LoggModel) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.debug(a);
        a += (LoggModel.response) ? ` - Resp: ${JSON.stringify(LoggModel.response)}` : '';


        this.logger.debug(a);
    }

    verbose(LoggModel: LoggModel) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.log(a);
        a += (LoggModel.response) ? ` - Resp: ${JSON.stringify(LoggModel.response)}` : '';


        this.logger.verbose(a);
    }

    _emitLoggers(LoggerModels: LoggModel[]) {

        for (const [i, LoggerModel] of LoggerModels.entries()) {

            switch (LoggerModel.type) {
                case 'log':
                    this.log(LoggerModel);
                    break;
                case 'error':
                    this.error(LoggerModel);
                    break;
                case 'warn':
                    this.warn(LoggerModel);
                    break;
                case 'debug':
                    this.debug(LoggerModel);
                    break;
                case 'verbose':
                    this.verbose(LoggerModel);
                    break;
                default:
                    this.log(LoggerModel);
                    break;
            }

        }

    }

}
