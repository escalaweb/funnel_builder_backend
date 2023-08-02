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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManagerController = void 0;
const common_1 = require("@nestjs/common");
const file_manager_service_1 = require("../services/file-manager.service");
const create_file_manager_dto_1 = require("../dto/create-file-manager.dto");
const update_file_manager_dto_1 = require("../dto/update-file-manager.dto");
let FileManagerController = class FileManagerController {
    constructor(fileManagerService) {
        this.fileManagerService = fileManagerService;
    }
    create(createFileManagerDto) {
        return this.fileManagerService.create(createFileManagerDto);
    }
    findAll() {
        return this.fileManagerService.findAll();
    }
    findOne(id) {
        return this.fileManagerService.findOne(+id);
    }
    update(id, updateFileManagerDto) {
        return this.fileManagerService.update(+id, updateFileManagerDto);
    }
    remove(id) {
        return this.fileManagerService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_manager_dto_1.CreateFileManagerDto]),
    __metadata("design:returntype", void 0)
], FileManagerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FileManagerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FileManagerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_file_manager_dto_1.UpdateFileManagerDto]),
    __metadata("design:returntype", void 0)
], FileManagerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FileManagerController.prototype, "remove", null);
FileManagerController = __decorate([
    (0, common_1.Controller)('file-manager'),
    __metadata("design:paramtypes", [file_manager_service_1.FileManagerService])
], FileManagerController);
exports.FileManagerController = FileManagerController;
//# sourceMappingURL=file-manager.controller.js.map