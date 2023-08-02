import { ApiProperty } from "@nestjs/swagger";

import { IsString, MinLength, IsEmail, MaxLength, Matches, IsNotEmpty } from "class-validator";


export class CreateFunnelLibraryDto {

    @ApiProperty({
        description: 'Default name that the funnels folder will have',
        example: 'Nombre de carpeta 1',
        nullable: false,
        minLength: 1,
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El nombre es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El nombre debe ser un string {{${validationArguments.property}}}`;
        },
    })
    @MinLength(1, {
        message(validationArguments) {
            return `El nombre debe contener minimo 1 caracter {{${validationArguments.property}}}`;
        },
    })
    name: string;

}
