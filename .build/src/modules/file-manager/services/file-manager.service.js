"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManagerService = void 0;
const common_1 = require("@nestjs/common");
let FileManagerService = class FileManagerService {
    create(createFileManagerDto) {
        return 'This action adds a new fileManager';
    }
    findAll() {
        return `This action returns all fileManager`;
    }
    findOne(id) {
        return `This action returns a #${id} fileManager`;
    }
    update(id, updateFileManagerDto) {
        return `This action updates a #${id} fileManager`;
    }
    remove(id) {
        return `This action removes a #${id} fileManager`;
    }
};
FileManagerService = __decorate([
    (0, common_1.Injectable)()
], FileManagerService);
exports.FileManagerService = FileManagerService;
//# sourceMappingURL=file-manager.service.js.map