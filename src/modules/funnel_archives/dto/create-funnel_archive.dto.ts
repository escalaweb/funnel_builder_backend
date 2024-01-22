import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { DtoKey_et } from "../../../common/entities";

export class CreateFunnelArchiveDto extends DtoKey_et {

    // @ApiProperty({
    //     description: 'Default name that the funnels folder will have',
    //     example: 'Archivo 1',
    //     nullable: false,
    //     minLength: 1,
    // })
    // @IsNotEmpty({
    //     message(validationArguments) {
    //         return `El parametro ${validationArguments.property} es requerido`;
    //     },
    // })
    // @IsString({
    //     message(validationArguments) {
    //         return `El parametro ${validationArguments.property} debe ser un string`;
    //     },
    // })
    // @MinLength(1, {
    //     message(validationArguments) {
    //         return `El parametro ${validationArguments.property} debe contener minimo 1 caracter`;
    //     },
    // })
    // name: string;

    // @ApiProperty({
    //     description: 'Default _id UUID reference to the funnel library',
    //     example: 'UUID_FUNNEL_LIBRARY',
    //     nullable: false,
    //     minLength: 1,
    // })
    // @IsOptional()
    // @IsNotEmpty({
    //     message(validationArguments) {
    //         return `El parametro ${validationArguments.property} es requerido`;
    //     },
    // })
    // @IsString({
    //     message(validationArguments) {
    //         return `El parametro ${validationArguments.property} debe ser un string`;
    //     },
    // })
    // @MinLength(1, {
    //     message(validationArguments) {
    //         return `El parametro ${validationArguments.property} debe contener minimo 1 caracter`;
    //     },
    // })
    // funnelLibrary_id?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    createdAt?: string;

    @IsOptional()
    @IsString()
    updatedAt?: string;

    @IsOptional()
    @IsUUID()
    user_id?: string; // Suponiendo que User_et tiene un campo _id de tipo UUID

    @IsOptional()
    @ValidateNested({ each: true })
    // @Type(() => any) // Define FunnelBodyDTO de acuerdo a la entidad FunnelBody_et
    funnels_id?: any[];

    @IsOptional()
    @IsUUID()
    funnelLibrary_id?: string; // Suponiendo que FunnelLibrary_et tiene un campo _id de tipo UUID

    @IsOptional()
    @IsUUID()
    config_step_id?: string; // Suponiendo que ConfigPlanner_et tiene un campo _id de tipo UUID

}
