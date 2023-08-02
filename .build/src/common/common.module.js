"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const adapters_1 = require("./adapters");
const filters_1 = require("./filters");
const middleware_module_1 = require("./middlewares/middleware.module");
const services_1 = require("./services");
const sockets_gateway_1 = require("./sockets/sockets.gateway");
const sockets_service_1 = require("./sockets/sockets.service");
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            middleware_module_1.MiddlewareModule
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: filters_1.HttpExceptionFilter,
            },
            services_1.CommonService,
            adapters_1.ProcessDataService,
            adapters_1.DateProcessService,
            sockets_gateway_1.SocketsGateway,
            sockets_service_1.SocketsService,
            services_1.ExeptionsHandlersService
        ],
        exports: [
            services_1.CommonService,
            adapters_1.ProcessDataService,
            adapters_1.DateProcessService,
            sockets_service_1.SocketsService,
            services_1.ExeptionsHandlersService
        ]
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map