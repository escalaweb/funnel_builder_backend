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
exports.FunnelsController = void 0;
const common_1 = require("@nestjs/common");
const funnels_service_1 = require("../services/funnels.service");
const create_funnel_dto_1 = require("../dto/create-funnel.dto");
const update_funnel_dto_1 = require("../dto/update-funnel.dto");
let FunnelsController = class FunnelsController {
    constructor(funnelsService) {
        this.funnelsService = funnelsService;
    }
    create(createFunnelDto) {
        return this.funnelsService.create(createFunnelDto);
    }
    findAll() {
        return this.funnelsService.findAll();
    }
    findOne(id) {
        return this.funnelsService.findOne(+id);
    }
    update(id, updateFunnelDto) {
        return this.funnelsService.update(+id, updateFunnelDto);
    }
    remove(id) {
        return this.funnelsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_funnel_dto_1.CreateFunnelDto]),
    __metadata("design:returntype", void 0)
], FunnelsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FunnelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FunnelsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_funnel_dto_1.UpdateFunnelDto]),
    __metadata("design:returntype", void 0)
], FunnelsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FunnelsController.prototype, "remove", null);
FunnelsController = __decorate([
    (0, common_1.Controller)('funnels'),
    __metadata("design:paramtypes", [funnels_service_1.FunnelsService])
], FunnelsController);
exports.FunnelsController = FunnelsController;
//# sourceMappingURL=funnels.controller.js.map