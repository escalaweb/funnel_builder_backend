import { HttpException } from '@nestjs/common';
import { _response_I } from '../../../common/interfaces';



export function fileMimetypeFilter(...mimetypes: string[]) {
    return (
        req,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
        if (mimetypes.some((m) => file.mimetype.includes(m))) {
            callback(null, true);
        } else {

            let _Response: _response_I<any> = {
                ok: false,
                statusCode: 400,
                message: [
                    {
                        text: `Formato no valido ${mimetypes.join(', ')}`,
                        type: 'global'
                    }
                ]
            }

            callback(new HttpException(_Response, _Response.statusCode), false);


            // callback(
            //   new UnsupportedMediaTypeException(
            //     `File type is not matching: ${mimetypes.join(', ')}`,
            //   ),
            //   false,
            // );
        }
        // callback(null, true);
    };
}
