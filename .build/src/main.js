"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const config_keys_1 = require("./config/config.keys");
const Config = new config_1.ConfigService();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Funnel builder Escala Restful Api')
        .setDescription('Funnel builder Escala endpoints')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-doc', app, document);
    await app.listen(Config.get(config_keys_1._Configuration_Keys.PORT), () => {
        logger.log(`App Nestjs running on port: ${Config.get(config_keys_1._Configuration_Keys.PORT)}`);
    });
}
bootstrap();
console.log(process.cwd());
//# sourceMappingURL=main.js.map