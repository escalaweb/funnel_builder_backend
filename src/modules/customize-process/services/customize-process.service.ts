import { Injectable } from '@nestjs/common';
import { CreateCustomizeProcessDto } from '../dto/create-customize-process.dto';
import { UpdateCustomizeProcessDto } from '../dto/update-customize-process.dto';

@Injectable()
export class CustomizeProcessService {

    constructor(

    ){



    }


  create(createCustomizeProcessDto: any) {


  }

  findAll() {
    return `This action returns all customizeProcess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customizeProcess`;
  }

  update(id: number, updateCustomizeProcessDto: UpdateCustomizeProcessDto) {
    return `This action updates a #${id} customizeProcess`;
  }

  remove(id: number) {
    return `This action removes a #${id} customizeProcess`;
  }
}
