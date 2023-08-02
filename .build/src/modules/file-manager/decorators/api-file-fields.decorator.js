"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFileFields = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
function ApiFileFields(uploadFields, localOptions) {
    const bodyProperties = Object.assign({}, ...uploadFields.map((field) => {
        return { [field.name]: { type: 'string', format: 'binary' } };
    }));
    const apiBody = (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: bodyProperties,
            required: uploadFields.filter((f) => f.required).map((f) => f.name),
        },
    });
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(uploadFields, localOptions)), (0, swagger_1.ApiConsumes)('multipart/form-data'), apiBody);
}
exports.ApiFileFields = ApiFileFields;
//# sourceMappingURL=api-file-fields.decorator.js.map