import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestService } from './test.service';
import { Auth } from '../auth/decorators';


@Controller('test')
export class TestController {

    constructor(private readonly testService: TestService) { }

    @Post()
    @Auth()
    create(@Body() data: any) {
        return this.testService.create(data);
    }

    @Get()
    // @Auth()
    findAll() {
        return this.testService.findAll();
    }

    //   @Get(':id')
    //   findOne(@Param('id') id: string) {
    //     return this.testService.findOne(+id);
    //   }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    //     return this.testService.update(+id, updateTestDto);
    //   }

    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    //     return this.testService.remove(+id);
    //   }

}
