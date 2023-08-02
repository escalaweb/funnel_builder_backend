import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { fileMimetypeFilter } from '../validations';


export function ApiFile(
  fieldName: string = 'file',
  required: boolean = false,
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}

export function ApiImageFile(
  fileName: string = 'image',
  required: boolean = false,
  localOptions?: MulterOptions,
) {

  let x:any = {
    fileFilter: fileMimetypeFilter('image')
  }

  if(localOptions != null){

    x = Object.assign( {}, x, localOptions)

  }


  return ApiFile(fileName, required, x);

}

export function ApiPdfFile(
  fileName: string = 'image',
  required: boolean = false,
  localOptions?: MulterOptions,
) {

  let x: any = {
    fileFilter: fileMimetypeFilter('pdf')
  }


  if(localOptions != null){

    x = Object.assign( {}, x, localOptions)

  }

  return ApiFile(fileName, required, x);
}
