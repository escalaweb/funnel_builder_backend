import { Module } from '@nestjs/common';
import { LibraryPermisionsService } from './services/library-permisions.service';
import { LibraryPermisionsController } from './controllers/library-permisions.controller';
import { LibraryPermisions_Rel_Module } from './rel.module';
import { EntitiesModule } from '../../database/entities/entities.module';

@Module({
    controllers: [
        LibraryPermisionsController
    ],
    providers: [
        LibraryPermisionsService],
    imports: [
        EntitiesModule,
        LibraryPermisions_Rel_Module
    ]
})
export class LibraryPermisionsModule { }
