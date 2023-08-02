import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export declare function ApiFiles(fieldName?: string, required?: boolean, maxCount?: number, localOptions?: MulterOptions): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
