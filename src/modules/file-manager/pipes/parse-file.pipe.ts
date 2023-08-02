import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
    HttpException,
} from '@nestjs/common';
import { _response_I } from '../../../common/interfaces';


@Injectable()
export class ParseFile implements PipeTransform {

    constructor(
    ) { }

    transform(
        files: Express.Multer.File | Express.Multer.File[],
        metadata: ArgumentMetadata,
    ): Express.Multer.File | Express.Multer.File[] {


        if (files === undefined || files === null) {
            // throw new BadRequestException('Validation failed (file expected)');

            let _Response: _response_I<any> = {
                ok: false,
                statusCode: 400,
                message: [
                    {
                        type: 'global',
                        text: `Se requiere un archivo`
                    }
                ]

            }

            // this._processData.returnThrow( _Response );
            throw new HttpException(_Response, _Response.statusCode);
        }

        if (this.isAnyObject(files)) {
            // throw new BadRequestException('Validation failed (file expected)');
            if (Object.keys(files).length == 0) {

                let _Response: _response_I<any> = {
                    ok: false,
                    statusCode: 400,
                    message: [
                        {
                            type: 'global',
                            text: `Se requiere al menos un archivo`
                        }
                    ]

                }

                throw new HttpException(_Response, _Response.statusCode);
            }

        }

        if (Array.isArray(files) && files.length === 0) {
            // throw new BadRequestException('Validation failed (files expected)');

            let _Response: _response_I<any> = {
                ok: false,
                statusCode: 400,
                message: [
                    {
                        type: 'global',
                        text: `Se requiere al menos un archivo`
                    }
                ]

            }

            // this._processData.returnThrow( _Response );
            throw new HttpException(_Response, _Response.statusCode);
        }

        return files;
    }

    isAnyObject(value) {
        return value != null && (typeof value === 'object' || typeof value === 'function');
    }

}
