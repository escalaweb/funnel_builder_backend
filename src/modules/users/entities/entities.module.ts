import { TypeOrmModule } from "@nestjs/typeorm";
import { User_et } from './user.entity';


export const USER_ENTITIES_MODULE = TypeOrmModule.forFeature([
    User_et
]);