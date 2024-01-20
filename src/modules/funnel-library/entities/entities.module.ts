import { TypeOrmModule } from "@nestjs/typeorm";

import { FunnelLibrary_et } from ".";



export const FUNNEL_LIBRARY_ENTITIES_MODULE = TypeOrmModule.forFeature([
    FunnelLibrary_et
]);

