import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException, HttpException } from '@nestjs/common';
import { _response_I } from '../interfaces';

@Injectable()
export class ExeptionsHandlersService {

    constructor() {

    }

    exceptionEmitHandler(Exception: _response_I<any>) {

        if (Exception.statusCode === 400) {
             throw new BadRequestException(Exception.message, {
                cause: Exception.err
            })
        }
        if (Exception.statusCode === 404) {
            // console.log('el mensaje', Exception.message);
            // console.log('el mensaje', Exception.err);
             throw new NotFoundException(Exception.message, {
                cause: Exception.err
            })
        }
        if (Exception.statusCode === 500) {
             throw new InternalServerErrorException(Exception.message, {
                cause: Exception.err
            })
        } else {

            //  new HttpException(_Response, _Response.statusCode)
             new HttpException(Exception, Exception.statusCode);

        }


    }

}
