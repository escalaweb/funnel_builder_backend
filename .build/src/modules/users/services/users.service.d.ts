import { UpdateUserDto } from '../dto/update-user.dto';
import { Model } from 'nestjs-dynamoose';
import { User, UserKey } from '../interfaces';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User, UserKey>);
    create(createUserDto: any): Promise<import("nestjs-dynamoose").Item<User>>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
