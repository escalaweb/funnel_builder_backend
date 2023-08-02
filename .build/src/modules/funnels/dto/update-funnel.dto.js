"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFunnelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_funnel_dto_1 = require("./create-funnel.dto");
class UpdateFunnelDto extends (0, swagger_1.PartialType)(create_funnel_dto_1.CreateFunnelDto) {
}
exports.UpdateFunnelDto = UpdateFunnelDto;
//# sourceMappingURL=update-funnel.dto.js.map