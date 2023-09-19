import { ApiProperty } from "@nestjs/swagger";

import { IsString, MinLength, IsEmail, MaxLength, Matches, IsNotEmpty } from "class-validator";
import { FunnelRelationSwitch_I } from "../interfaces";


export class CreateFunnelDto {

/*
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
*/

    // @ApiProperty({
    //     description: 'Funnel id for handler the funnel',
    //     example: '2lyrcjMkH02IXjJuLEhG',
    //     nullable: false,
    //     minLength: 1,
    // })
    // @IsNotEmpty({
    //     message(validationArguments) {
    //         return `El funnel_id es requerido {{${validationArguments.property}}}`;
    //     },
    // })
    // @IsString({
    //     message(validationArguments) {
    //         return `El funnel_id debe ser un string {{${validationArguments.property}}}`;
    //     },
    // })
    // @MinLength(1, {
    //     message(validationArguments) {
    //         return `El funnel_id debe contener minimo 1 caracter {{${validationArguments.property}}}`;
    //     },
    // })
    // funnel_id: string;

    // @ApiProperty({
    //     description: 'Funnel name for handler the funnel',
    //     example: 'Facebook Ads',
    //     nullable: false,
    //     minLength: 1,
    // })
    // @IsNotEmpty({
    //     message(validationArguments) {
    //         return `El nombre es requerido {{${validationArguments.property}}}`;
    //     },
    // })
    // @IsString({
    //     message(validationArguments) {
    //         return `El nombre debe ser un string {{${validationArguments.property}}}`;
    //     },
    // })
    // @MinLength(1, {
    //     message(validationArguments) {
    //         return `El nombre debe contener minimo 1 caracter {{${validationArguments.property}}}`;
    //     },
    // })
    // name: string;

    // @ApiProperty({
    //     description: 'Funnel name for handler the funnel',
    //     example: 'byResult or byAudience',
    //     nullable: false,
    //     minLength: 1,
    // })
    // @IsNotEmpty({
    //     message(validationArguments) {
    //         return `El tipo de funnel es requerido {{${validationArguments.property}}}`;
    //     },
    // })
    // @IsString({
    //     message(validationArguments) {
    //         return `El tipo de funnel debe ser un string {{${validationArguments.property}}}`;
    //     },
    // })
    // @MinLength(1, {
    //     message(validationArguments) {
    //         return `El tipo de funnel debe contener minimo 1 caracter {{${validationArguments.property}}}`;
    //     },
    // })
    // type: string;

    // stages: StageItems_I[];

    // relations: FunnelRelationSwitch_I[];

}
