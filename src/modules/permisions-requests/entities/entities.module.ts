import { TypeOrmModule } from "@nestjs/typeorm";
import { PermisionsRequest_et } from "./permisions-request.entity";

export const PERMISIONS_REQUEST_ENTITIES_MODULE = TypeOrmModule.forFeature([
    PermisionsRequest_et
]);