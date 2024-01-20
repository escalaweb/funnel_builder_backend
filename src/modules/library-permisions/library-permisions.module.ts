import { Module } from '@nestjs/common';
import { LibraryPermisionsController } from './controllers/library-permisions.controller';
import { LibraryPermisions_Rel_Module } from './rel.module';
import { LibraryPermisionsService } from './services/library-permisions.service';
import { Db_Module } from '../../database/DB.module';

@Module({
    controllers: [
        LibraryPermisionsController
    ],
    providers: [
        LibraryPermisionsService,
    ],
    imports: [
        Db_Module,
        LibraryPermisions_Rel_Module
    ],
    exports: [
        LibraryPermisionsService
    ]
})
export class LibraryPermisionsModule { }
