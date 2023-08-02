/// <reference types="multer" />
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParseFile implements PipeTransform {
    constructor();
    transform(files: Express.Multer.File | Express.Multer.File[], metadata: ArgumentMetadata): Express.Multer.File | Express.Multer.File[];
    isAnyObject(value: any): boolean;
}
