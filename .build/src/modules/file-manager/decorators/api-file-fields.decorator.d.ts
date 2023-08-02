import { MulterField, MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export type UploadFields = MulterField & {
    required?: boolean;
    fileFilter?: any;
};
export declare function ApiFileFields(uploadFields: UploadFields[], localOptions?: MulterOptions): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
