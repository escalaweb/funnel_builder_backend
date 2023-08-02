"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelLibraryService = void 0;
const common_1 = require("@nestjs/common");
let FunnelLibraryService = class FunnelLibraryService {
    create(createFunnelLibraryDto) {
        return 'This action adds a new funnelLibrary';
    }
    findAll() {
        return `This action returns all funnelLibrary`;
    }
    findOne(id) {
        return `This action returns a #${id} funnelLibrary`;
    }
    update(id, updateFunnelLibraryDto) {
        return `This action updates a #${id} funnelLibrary`;
    }
    remove(id) {
        return `This action removes a #${id} funnelLibrary`;
    }
};
FunnelLibraryService = __decorate([
    (0, common_1.Injectable)()
], FunnelLibraryService);
exports.FunnelLibraryService = FunnelLibraryService;
//# sourceMappingURL=funnel-library.service.js.map