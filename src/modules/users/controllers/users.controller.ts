import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { Auth, Auth_SameID } from '../../auth/decorators';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    // @Post()
    // test() {
    // }

    // @Get()
    // @Auth()
    // findAll() {
    //     return null;
    // }

    // @Get(':id')
    // // @Auth()
    // @Auth_SameID()
    // findOne(@Param('id') id: string) {
    //     // return this.usersService.findOne(id);
    // }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    //   }

    @Delete(':id')
    // @Auth_SameID()
    async remove(@Param('id') id: string) {
        return await this.usersService.delete_user(id);
    }

}
