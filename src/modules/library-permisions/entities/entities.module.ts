import { TypeOrmModule } from "@nestjs/typeorm";
import { LibraryPermisions_et } from "./library-permision.entity";

export const FUNNEL_LIBRARY_PERMISIONS_ENTITIES_MODULE = TypeOrmModule.forFeature([
    LibraryPermisions_et
]);