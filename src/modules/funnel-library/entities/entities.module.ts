import { TypeOrmModule } from "@nestjs/typeorm";

import { FunnelArchive_et, FunnelLibrary_et } from ".";



export const FUNNEL_LIBRARY_ENTITIES_MODULE = TypeOrmModule.forFeature([
    FunnelLibrary_et
]);

export const FUNNEL_ARCHIVE_ENTITIES_MODULE = TypeOrmModule.forFeature([
    FunnelArchive_et
]);