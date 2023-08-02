import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: any): Promise<import("nestjs-dynamoose").Item<import("../interfaces").User>>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
