/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
/// <reference types="passport" />
export declare function fileMimetypeFilter(...mimetypes: string[]): (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
