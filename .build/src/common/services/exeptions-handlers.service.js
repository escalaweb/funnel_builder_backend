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
exports.ExeptionsHandlersService = void 0;
const common_1 = require("@nestjs/common");
let ExeptionsHandlersService = class ExeptionsHandlersService {
    constructor() {
    }
    exceptionEmitHandler(Exception) {
        if (Exception.statusCode === 400) {
            throw new common_1.BadRequestException(Exception.message, {
                cause: Exception.err
            });
        }
        if (Exception.statusCode === 404) {
            throw new common_1.NotFoundException(Exception.message, {
                cause: Exception.err
            });
        }
        if (Exception.statusCode === 500) {
            throw new common_1.InternalServerErrorException(Exception.message, {
                cause: Exception.err
            });
        }
        else {
            new common_1.HttpException(Exception, Exception.statusCode);
        }
    }
};
ExeptionsHandlersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ExeptionsHandlersService);
exports.ExeptionsHandlersService = ExeptionsHandlersService;
//# sourceMappingURL=exeptions-handlers.service.js.map