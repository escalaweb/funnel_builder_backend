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
exports.ConfigProjectService = void 0;
const fs = require("fs");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const config_keys_1 = require("./config.keys");
const dotenv = require("dotenv");
let ConfigProjectService = class ConfigProjectService {
    constructor(_configService) {
        this._configService = _configService;
        let path = process.cwd();
        let isEnviroment = '';
        if (fs.existsSync(path + "/.env")) {
            isEnviroment = this._configService.get(config_keys_1._Configuration_Keys.ENVIROMENT);
            dotenv.config({ path: path + "/.env" });
            this.envConfig = (0, dotenv_1.parse)(fs.readFileSync(path + "/.env"));
        }
        else if (fs.existsSync(path + "/.env.prod")) {
            isEnviroment = this._configService.get(config_keys_1._Configuration_Keys.ENVIROMENT);
            dotenv.config({ path: path + "/.env.prod" });
            this.envConfig = (0, dotenv_1.parse)(fs.readFileSync(path + "/.env.prod"));
        }
        if (isEnviroment != '') {
            this.setTypeEnviroment(isEnviroment);
            return;
        }
        isEnviroment = this._configService.get(config_keys_1._Configuration_Keys.ENVIROMENT);
        if (isEnviroment != '') {
            this.setTypeEnviroment(isEnviroment);
            return;
        }
    }
    setTypeEnviroment(isDevelopmentEnv) {
        if (isDevelopmentEnv === 'developer') {
            global._prod = false;
        }
        else if (isDevelopmentEnv === 'production') {
            global._prod = true;
        }
        else {
            global._prod = false;
        }
    }
    _get(_configkey) {
        return this._configService.get(_configkey);
    }
};
ConfigProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigProjectService);
exports.ConfigProjectService = ConfigProjectService;
//# sourceMappingURL=config.service.js.map