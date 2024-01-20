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
            return `El parametro ${validationArguments.property} es requerido`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El parametro ${validationArguments.property} debe ser un string`;
        },
    })
    @MinLength(1, {
        message(validationArguments) {
            return `El parametro ${validationArguments.property} debe contener minimo 1 caracter`;
        },
    })
    name: string;

}
