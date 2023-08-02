"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigProjectModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_config_1 = require("./app.config");
const config_service_1 = require("./config.service");
const dynamoose_config_1 = require("../database/dynamoose-config");
let ConfigProjectModule = class ConfigProjectModule {
};
ConfigProjectModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [app_config_1.EnvConfigurations],
            }),
            dynamoose_config_1._DYNAMOOSE_MODULE
        ],
        providers: [
            {
                provide: config_service_1.ConfigProjectService,
                useValue: new config_service_1.ConfigProjectService(new config_1.ConfigService()),
            },
        ],
        exports: [config_service_1.ConfigProjectService],
    })
], ConfigProjectModule);
exports.ConfigProjectModule = ConfigProjectModule;
//# sourceMappingURL=config.module.js.map