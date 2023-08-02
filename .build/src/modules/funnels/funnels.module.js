"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelsModule = void 0;
const common_1 = require("@nestjs/common");
const funnels_service_1 = require("./services/funnels.service");
const funnels_controller_1 = require("./controllers/funnels.controller");
let FunnelsModule = class FunnelsModule {
};
FunnelsModule = __decorate([
    (0, common_1.Module)({
        controllers: [funnels_controller_1.FunnelsController],
        providers: [funnels_service_1.FunnelsService]
    })
], FunnelsModule);
exports.FunnelsModule = FunnelsModule;
//# sourceMappingURL=funnels.module.js.map