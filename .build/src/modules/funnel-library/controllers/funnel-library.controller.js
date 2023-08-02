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
exports.FunnelLibraryController = void 0;
const common_1 = require("@nestjs/common");
const create_funnel_library_dto_1 = require("../dto/create-funnel-library.dto");
const update_funnel_library_dto_1 = require("../dto/update-funnel-library.dto");
const funnel_library_service_1 = require("../services/funnel-library.service");
let FunnelLibraryController = class FunnelLibraryController {
    constructor(funnelLibraryService) {
        this.funnelLibraryService = funnelLibraryService;
    }
    create(createFunnelLibraryDto) {
        return this.funnelLibraryService.create(createFunnelLibraryDto);
    }
    findAll() {
        return this.funnelLibraryService.findAll();
    }
    findOne(id) {
        return this.funnelLibraryService.findOne(+id);
    }
    update(id, updateFunnelLibraryDto) {
        return this.funnelLibraryService.update(+id, updateFunnelLibraryDto);
    }
    remove(id) {
        return this.funnelLibraryService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_funnel_library_dto_1.CreateFunnelLibraryDto]),
    __metadata("design:returntype", void 0)
], FunnelLibraryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FunnelLibraryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FunnelLibraryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_funnel_library_dto_1.UpdateFunnelLibraryDto]),
    __metadata("design:returntype", void 0)
], FunnelLibraryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FunnelLibraryController.prototype, "remove", null);
FunnelLibraryController = __decorate([
    (0, common_1.Controller)('funnel-library'),
    __metadata("design:paramtypes", [funnel_library_service_1.FunnelLibraryService])
], FunnelLibraryController);
exports.FunnelLibraryController = FunnelLibraryController;
//# sourceMappingURL=funnel-library.controller.js.map