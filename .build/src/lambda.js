"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const config_keys_1 = require("./config/config.keys");
const helmet_1 = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const express = require('express');
const binaryMimeTypes = [];
let cachedServer;
const Config = new config_1.ConfigService();
async function bootstrapServer() {
    if (!cachedServer) {
        const expressApp = express();
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        app.use((0, middleware_1.eventContext)());
        const logger = new common_1.Logger('Bootstrap');
        const allowedOrigins = Config.get(config_keys_1._Configuration_Keys.ALLOWEDORIGINS);
        app.use((0, helmet_1.default)());
        app.enableCors({
            origin: function (origin, callback) {
                if (!origin)
                    return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg = "Theeee CORS policy for this site does not " +
                        "allow access from the specified Origin.";
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
        });
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Funnel builder Escala Restful Api')
            .setDescription('Funnel builder Escala endpoints')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api-doc', app, document);
        await app.init().then(resp => {
            logger.log(`App Nestjs running`);
        });
        cachedServer = (0, aws_serverless_express_1.createServer)(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}
const handler = async (event, context) => {
    cachedServer = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map