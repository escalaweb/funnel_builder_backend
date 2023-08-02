"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFiles = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
function ApiFiles(fieldName = 'files', required = false, maxCount = 10, localOptions) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)(fieldName, maxCount, localOptions)), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: required ? [fieldName] : [],
            properties: {
                [fieldName]: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }));
}
exports.ApiFiles = ApiFiles;
//# sourceMappingURL=api-files.decorator.js.map