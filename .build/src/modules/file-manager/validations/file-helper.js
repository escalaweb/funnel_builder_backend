"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileName = exports.dofcumentFileFilter = exports.sqlFileFilter = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const documentSize = 5000000;
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        let _Response = {
            ok: false,
            statusCode: 400,
            message: [
                {
                    text: 'Formato de imagen no válido',
                    type: 'global'
                }
            ],
            err: 'Formato de imagen no válido'
        };
        return callback(new common_1.HttpException(_Response, _Response.statusCode), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const sqlFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(sql|SQL)$/)) {
        let _Response = {
            ok: false,
            statusCode: 400,
            message: [
                {
                    text: 'Formato de dump SQL no válido',
                    type: 'global'
                }
            ],
            err: 'Formato de dump SQL no válido'
        };
        return callback(new common_1.HttpException(_Response, _Response.statusCode), false);
    }
    callback(null, true);
};
exports.sqlFileFilter = sqlFileFilter;
const dofcumentFileFilter = (req, file, callback) => {
    const fileSize = parseInt(req.headers['content-length']);
    if (!file.originalname.match(/\.(pdf|PDF|doc|DOC|docx|DOCX)$/)) {
        let _Response = {
            ok: false,
            statusCode: 400,
            message: [
                {
                    text: 'Formato de documento no válido',
                    type: 'global'
                }
            ],
            err: 'Formato de documento no válido'
        };
        return callback(new common_1.HttpException(_Response, _Response.statusCode), false);
    }
    if (setFile('document', fileSize) == false) {
        let _Response = {
            ok: false,
            statusCode: 400,
            message: [
                {
                    text: 'Solo se permiten documentos menores a 5MB',
                    type: 'global'
                }
            ],
            err: 'Solo se permiten documentos menores a 5MB'
        };
        return callback(new common_1.HttpException(_Response, _Response.statusCode), false);
    }
    callback(null, true);
};
exports.dofcumentFileFilter = dofcumentFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const setFile = (type, fileSize) => {
    if (type == 'document') {
        if (fileSize >= documentSize) {
            return false;
        }
    }
};
//# sourceMappingURL=file-helper.js.map