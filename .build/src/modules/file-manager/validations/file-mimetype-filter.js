"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMimetypeFilter = void 0;
const common_1 = require("@nestjs/common");
function fileMimetypeFilter(...mimetypes) {
    return (req, file, callback) => {
        if (mimetypes.some((m) => file.mimetype.includes(m))) {
            callback(null, true);
        }
        else {
            let _Response = {
                ok: false,
                statusCode: 400,
                message: [
                    {
                        text: `Formato no valido ${mimetypes.join(', ')}`,
                        type: 'global'
                    }
                ]
            };
            callback(new common_1.HttpException(_Response, _Response.statusCode), false);
        }
    };
}
exports.fileMimetypeFilter = fileMimetypeFilter;
//# sourceMappingURL=file-mimetype-filter.js.map