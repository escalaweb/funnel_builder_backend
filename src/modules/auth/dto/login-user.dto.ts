import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';



export class LoginUserDto {

    @ApiProperty({
        description: 'Email of user',
        example: 'email@gmail.com | email@hotmail.com | email@yahoo.com | ect@etc.com',
        nullable: false,
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El email es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El email debe ser un string {{${validationArguments.property}}}`;
        },
    })
    @IsEmail(undefined, {
        message(validationArguments) {
            return `El email no es válido {{${validationArguments.property}}}`;
        },
    })
    email: string;


    @ApiProperty({
        description: 'Password account',
        example: 'MMai0Or2PGvdd50s4UU5',
        nullable: false,
        minimum: 6,
        maximum: 50
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `La contraseña es requerida {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `La contraseña debe ser un string {{${validationArguments.property}}}`;
        },
    })
    @MinLength(6, {
        message(validationArguments) {
            return `La contraseña debe tener minimo 6 caracteres {{${validationArguments.property}}}`;
        },
    })
    @MaxLength(50, {
        message(validationArguments) {
            return `La contraseña debe tener máximo 50 caracteres {{${validationArguments.property}}}`;
        }
    })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message(validationArguments) {
            return `La contraseña debe contener al menos Mayuscula, minuscula, letras y números {{${validationArguments.property}}}`;
        },
    })
    pass: string;


}