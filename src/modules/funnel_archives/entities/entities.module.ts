import { TypeOrmModule } from "@nestjs/typeorm";
import { FunnelArchive_et } from ".";


export const FUNNEL_ARCHIVE_ENTITIES_MODULE = TypeOrmModule.forFeature([
    FunnelArchive_et
]);