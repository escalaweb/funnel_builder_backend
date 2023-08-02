"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const common_module_1 = require("./common/common.module");
const config_module_1 = require("./config/config.module");
const file_manager_module_1 = require("./modules/file-manager/file-manager.module");
const users_module_1 = require("./modules/users/users.module");
const funnel_library_module_1 = require("./modules/funnel-library/funnel-library.module");
const funnels_module_1 = require("./modules/funnels/funnels.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigProjectModule,
            common_module_1.CommonModule,
            file_manager_module_1.FileManagerModule,
            users_module_1.UsersModule,
            funnel_library_module_1.FunnelLibraryModule,
            funnels_module_1.FunnelsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map