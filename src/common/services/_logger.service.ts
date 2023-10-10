import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';

export interface LoggModel {
    // dateStamp: string;
    message: string;
    context?: string;
    trace?: any;
    type?: 'log' | 'error' | 'warn' | 'debug' | 'verbose';
}

@Injectable({ scope: Scope.DEFAULT })
export class _LoggerService implements LoggerService {

    private readonly logger: winston.Logger;

    constructor(

    ) {

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
            transports: [
                // new winston.transports.File({ filename: 'debug.log' }),
                new winston.transports.Console()
            ],
        });

    }

    log( LoggModel: LoggModel ) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.log(a);
        this.logger.info(a);
    }

    error( LoggModel: LoggModel ) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.error( a, { ...LoggModel.trace } );
        this.logger.error( a, { ...LoggModel.trace } );
    }

    warn( LoggModel: LoggModel ) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.warn(a);
        this.logger.warn(a);
    }

    debug( LoggModel: LoggModel ) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.debug(a);
        this.logger.debug(a);
    }

    verbose( LoggModel: LoggModel ) {
        let a: string = (LoggModel.context) ? `[${LoggModel.context}] - ${LoggModel.message}` : LoggModel.message;
        // console.log(a);
        this.logger.verbose(a);
    }

    _emitLoggers(LoggerModels: LoggModel[]){

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
