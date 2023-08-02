"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor() {
    }
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const path = request.url;
        let error = null;
        console.log('exception.cause', exception);
        if ((_a = exception.cause) === null || _a === void 0 ? void 0 : _a.stack) {
            error = exception.cause.stack;
        }
        else if (exception.cause) {
            error = exception.cause;
        }
        const message = exception['response'].message;
        if (error != null) {
            const logger = new common_1.Logger(`Exception filter - Status: ${status} - Path: ${path}`);
            logger.error(exception.cause);
        }
        else if (exception['response'].message) {
            const logger = new common_1.Logger(`Exception filter - Status: ${status} - Path: ${path}`);
            logger.error(exception['response'].message);
        }
        const _response = {
            ok: false,
            statusCode: status,
            path: path,
            data: null,
            message: message,
            err: error
        };
        response
            .status(status)
            .json(_response);
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [])
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map