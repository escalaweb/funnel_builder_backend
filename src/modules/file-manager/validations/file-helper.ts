import { HttpException } from "@nestjs/common";
import { extname } from "path";

import { _response_I } from "../../../common/interfaces";



const documentSize: number = 5000000;


export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {

        let _Response: _response_I<any> = {
            ok: false,
            statusCode: 400,
            message: [
                {
                    text: 'Formato de imagen no válido',
                    type: 'global'
                }
            ],
            err: 'Formato de imagen no válido'
        }

        return callback(new HttpException(_Response, _Response.statusCode), false);

    }
    callback(null, true);
};


export const sqlFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(sql|SQL)$/)) {

        let _Response: _response_I<any> = {
            ok: false,
            statusCode: 400,
            message: [
                {
                    text: 'Formato de dump SQL no válido',
                    type: 'global'
                }
            ],
            err: 'Formato de dump SQL no válido'
        }

        return callback(new HttpException(_Response, _Response.statusCode), false);

    }
    callback(null, true);
};

export const dofcumentFileFilter = (req, file, callback) => {

    const fileSize = parseInt(req.headers['content-length']);

    if (!file.originalname.match(/\.(pdf|PDF|doc|DOC|docx|DOCX)$/)) {

        let _Response: _response_I<any> = {
            ok: false,
            statusCode: 400,
            message: [
                {
                    text: 'Formato de documento no válido',
                    type: 'global'
                }
            ],
            err: 'Formato de documento no válido'
        }

        return callback(new HttpException(_Response, _Response.statusCode), false);

    }

    if (setFile('document', fileSize) == false) {

        let _Response: _response_I<any> = {
            ok: false,
            statusCode: 400,
            message: [
                {
                    text: 'Solo se permiten documentos menores a 5MB',
                    type: 'global'
                }
            ],
            err: 'Solo se permiten documentos menores a 5MB'
        }

        return callback(new HttpException(_Response, _Response.statusCode), false);

    }

    callback(null, true);
};

export const editFileName = (req, file, callback) => {

    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);

};

const setFile = (type: string, fileSize: number) => {

    if (type == 'document') {

        if (fileSize >= documentSize) {

            return false;

        }

    }

}


