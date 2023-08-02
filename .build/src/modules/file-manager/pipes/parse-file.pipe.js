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
exports.ParseFile = void 0;
const common_1 = require("@nestjs/common");
let ParseFile = class ParseFile {
    constructor() { }
    transform(files, metadata) {
        if (files === undefined || files === null) {
            let _Response = {
                ok: false,
                statusCode: 400,
                message: [
                    {
                        type: 'global',
                        text: `Se requiere un archivo`
                    }
                ]
            };
            throw new common_1.HttpException(_Response, _Response.statusCode);
        }
        if (this.isAnyObject(files)) {
            if (Object.keys(files).length == 0) {
                let _Response = {
                    ok: false,
                    statusCode: 400,
                    message: [
                        {
                            type: 'global',
                            text: `Se requiere al menos un archivo`
                        }
                    ]
                };
                throw new common_1.HttpException(_Response, _Response.statusCode);
            }
        }
        if (Array.isArray(files) && files.length === 0) {
            let _Response = {
                ok: false,
                statusCode: 400,
                message: [
                    {
                        type: 'global',
                        text: `Se requiere al menos un archivo`
                    }
                ]
            };
            throw new common_1.HttpException(_Response, _Response.statusCode);
        }
        return files;
    }
    isAnyObject(value) {
        return value != null && (typeof value === 'object' || typeof value === 'function');
    }
};
ParseFile = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ParseFile);
exports.ParseFile = ParseFile;
//# sourceMappingURL=parse-file.pipe.js.map