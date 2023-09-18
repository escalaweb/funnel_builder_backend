// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as serverless from 'serverless-http';
// // import { Express } from 'express';


// const express = require('express');


// let cachedServer;

// async function bootstrap() {
//   const expressApp = express();
//   const adapter = new ExpressAdapter(expressApp);

//   const app = await NestFactory.create(AppModule, adapter);
//   await app.init();

//   return expressApp;
// }

// export const handler = async (event, context) => {
//   if (!cachedServer) {
//     cachedServer = await bootstrap();
//   }
//   return serverless(cachedServer)(event, context);
// };


// --------------

import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { _Configuration_Keys } from './config/config.keys';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


const express = require('express');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

const Config = new ConfigService();

async function bootstrapServer(): Promise<Server> {
    if (!cachedServer) {
        const expressApp = express();
        const app = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        )
        app.setGlobalPrefix('funnel-designer');
        app.use(eventContext());

        const logger = new Logger('Bootstrap');

        app.use(helmet());

        /*
        */
        // const allowedOrigins = Config.get(_Configuration_Keys.ALLOWEDORIGINS);
        app.enableCors({
            origin: function (origin, callback) {
                // allow requests with no origin
                // (like mobile apps or curl requests)
                if (!origin) return callback(null, true);

                // if (allowedOrigins.indexOf(origin) === -1) {
                //     var msg =
                //         "Theeee CORS policy for this site does not " +
                //         "allow access from the specified Origin.";
                //     return callback(new Error(msg), false);
                // }
                return callback(null, true);
            },
        });


        const config = new DocumentBuilder()
            .setTitle('Funnel builder Escala Restful Api')
            .setDescription('Funnel builder Escala endpoints')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api-doc', app, document);

        await app.init().then(resp => {
            // console.log('resp', resp);
            logger.log(`App Nestjs running`);
        });
        // await app.listen(Config.get(_Configuration_Keys.PORT), () => {
        //     logger.log(`App Nestjs running on port: ${Config.get(_Configuration_Keys.PORT)}`);
        // });


        cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
    cachedServer = await bootstrapServer();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
}