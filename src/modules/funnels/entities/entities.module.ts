import { TypeOrmModule } from "@nestjs/typeorm";
import { FunnelBody_et, FunnelBody_stages_et } from "./funnel.entity";


export const FUNNELS_ENTITIES_MODULE = TypeOrmModule.forFeature([
    FunnelBody_et,
]);
export const FUNNEL_STAGES_ENTITIES_MODULE = TypeOrmModule.forFeature([
    FunnelBody_stages_et
]);