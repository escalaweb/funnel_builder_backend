import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigPlanner_et } from "./configPlanner.entity";



export const CONFIGPLANNER_ENTITIES_MODULE = TypeOrmModule.forFeature([
    ConfigPlanner_et
]);