import { TypeOrmModule } from "@nestjs/typeorm";
import { LibraryPermision_et } from "./library-permision.entity";

export const FUNNEL_LIBRARY_PERMISIONS_ENTITIES_MODULE = TypeOrmModule.forFeature([
    LibraryPermision_et
]);