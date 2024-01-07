import { Controller, Get, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Auth, Auth_SameID } from '../../auth/decorators';
import { AuthPayload_I } from '../../auth/interfaces';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('get_users')
    @Auth()
    async getUsers_byOwner( @Request() req: any) {
        const user: AuthPayload_I = req.user;
        const token: string = req.headers.authorization.replace('Bearer ', '');
        return await this.usersService.getUsers_byOwner(user, token);
    }

    @Delete(':id')
    @Auth_SameID()
    async remove(@Param('id') id: string) {
        return await this.usersService.delete_user(id);
    }

}
