import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePermisionsRequestDto } from './create-permisions-request.dto';
import { IsOptional, IsUUID, IsNumber, MinLength, MaxLength, IsNotEmpty, Min, Max } from 'class-validator';

export class UpdatePermisionsRequestDto extends PartialType(CreatePermisionsRequestDto) {

    @ApiProperty({
        description: 'Permision number to reference the type of permision',
        example: '1 (Read), 2 (Write)',
        nullable: false,
        minLength: 1,
    })
    @IsNumber({}, { message: 'El valor debe ser un número.' })
    @IsNotEmpty({ message: 'Este campo no puede estar vacío.' })
    @Min(1, {
        message(arg) {
            return `El parametro {{${arg.property}} debe ser de un único dígito y no menor que 0.`
        }
    })
    @Max(4, {
        message(arg) {
            return `El parametro {{${arg.property}} debe ser de un único dígito y no mayor que 9.`
        }
    })
    permisionType: number;

}
