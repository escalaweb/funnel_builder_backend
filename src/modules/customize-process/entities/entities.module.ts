import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomizeProcess_et } from "./customize-process.entity";



export const CUSTOMIZE_PROCESS_ENTITIES_MODULE = TypeOrmModule.forFeature([
    CustomizeProcess_et
]);