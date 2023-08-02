"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelsService = void 0;
const common_1 = require("@nestjs/common");
let FunnelsService = class FunnelsService {
    create(createFunnelDto) {
        return 'This action adds a new funnel';
    }
    findAll() {
        return `This action returns all funnels`;
    }
    findOne(id) {
        return `This action returns a #${id} funnel`;
    }
    update(id, updateFunnelDto) {
        return `This action updates a #${id} funnel`;
    }
    remove(id) {
        return `This action removes a #${id} funnel`;
    }
};
FunnelsService = __decorate([
    (0, common_1.Injectable)()
], FunnelsService);
exports.FunnelsService = FunnelsService;
//# sourceMappingURL=funnels.service.js.map