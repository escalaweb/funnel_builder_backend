"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFileManagerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_file_manager_dto_1 = require("./create-file-manager.dto");
class UpdateFileManagerDto extends (0, swagger_1.PartialType)(create_file_manager_dto_1.CreateFileManagerDto) {
}
exports.UpdateFileManagerDto = UpdateFileManagerDto;
//# sourceMappingURL=update-file-manager.dto.js.map