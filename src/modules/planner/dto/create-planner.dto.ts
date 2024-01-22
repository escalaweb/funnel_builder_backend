import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNotEmpty, IsString, MinLength, IsArray, IsBoolean, IsIn, IsNumber, ValidateNested } from "class-validator";
import { CST_ActionSettings_Type, CST_ActionSettings_Type_Default } from "../interfaces";
import { Type } from "class-transformer";
import { Funnel_TimingMetrics_Type_Default, ToolSetting_Type } from "../../funnels/interfaces";


class CST_ActionsSettings_DTO {

    @IsIn(CST_ActionSettings_Type_Default)
    type: CST_ActionSettings_Type;

    @IsBoolean()
    status: boolean;

    @IsString()
    note: string;
}

export class CST_ToolSettingsConfig_DTO {

    @IsIn(Funnel_TimingMetrics_Type_Default) // Reemplaza con los valores válidos de ToolSetting_Type
    type: ToolSetting_Type;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CST_ActionsSettings_DTO)
    actionsSettings: CST_ActionsSettings_DTO[];

    @IsNumber()
    date: number;
}

export class CreatePlannerDto {


      @ApiProperty({
        description: 'Default _id UUID reference to config planner',
        example: 'UUID_FUNNEL_LIBRARY',
        nullable: false,
        minLength: 1,
    })
    @IsOptional()
     @IsNotEmpty({
        message(validationArguments) {
            return `El parametro ${validationArguments.property} es requerido`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El parametro ${validationArguments.property} debe ser un string uuid`;
        },
    })
    @MinLength(1, {
        message(validationArguments) {
            return `El parametro ${validationArguments.property} debe contener minimo 1 caracter`;
        },
    })
    _id?: string;

      @ApiProperty({
        description: 'Default _id UUID reference to the funnel archives',
        example: 'UUID_FUNNEL_LIBRARY',
        nullable: false,
        minLength: 1,
    })
    @IsOptional()
    @IsNotEmpty({
        message(validationArguments) {
            return `El parametro ${validationArguments.property} es requerido`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El parametro ${validationArguments.property} debe ser un string uuid`;
        },
    })
    @MinLength(1, {
        message(validationArguments) {
            return `El parametro ${validationArguments.property} debe contener minimo 1 caracter`;
        },
    })
    archives_id?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CST_ToolSettingsConfig_DTO)
    toolSettingsConfig?: CST_ToolSettingsConfig_DTO;

}
