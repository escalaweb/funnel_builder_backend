import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {

    constructor() {

    }

    create(data: any) {

        return {
            message: "Post Test route success",
            body: data,
        };

    }

    findAll() {

        return {
            message: "Get Test route success",
        }

    }

    //   findOne(id: number) {
    //     return `This action returns a #${id} test`;
    //   }

    //   update(id: number, updateTestDto: UpdateTestDto) {
    //     return `This action updates a #${id} test`;
    //   }

    //   remove(id: number) {
    //     return `This action removes a #${id} test`;
    //   }
}
