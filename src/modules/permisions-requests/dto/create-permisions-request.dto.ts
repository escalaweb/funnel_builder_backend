import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreatePermisionsRequestDto {

    @ApiProperty({
        description: 'String UUID optional reference to the funnel library',
        example: '00ff9e98-c0c5-417d-9991-79a9ce36e4be',
        nullable: false,
        minLength: 1,
    })
    @IsOptional()
    @IsUUID('4',
     {
        message(args) {
            return `El ${args.property} debe ser un UUID válido.`;
        }
     }
    )
    funnelLibrary_id?: string;

    // @ApiProperty({
    //     description: 'String UUID optional reference to the funnel library',
    //     example: '00ff9e98-c0c5-417d-9991-79a9ce36e4be',
    //     nullable: false,
    //     minLength: 1,
    // })
    // @IsOptional()
    // @IsUUID('4',
    // {
    //     message(args) {
    //         return `El ${args.property} debe ser un UUID válido.`;
    //     }
    // }
    // )
    // archive_id?: string;

    // @ApiProperty({
    //     description: 'Required String UUID reference to the user that requested the permision',
    //     example: '00ff9e98-c0c5-417d-9991-79a9ce36e4be',
    //     nullable: false,
    //     minLength: 1,
    // })
    // @IsNotEmpty({
    //     message(validationArguments) {
    //         return `El parametro ${validationArguments.property} es requerido`;
    //     },
    // })
    // @IsUUID('4',
    //     {
    //         message(args) {
    //             return `El ${args.property} debe ser un UUID válido.`;
    //         }
    //     }
    // )
    // requested_by: string;

    // @IsOptional()
    // @IsUUID('4',
    //     { message: 'served_by debe ser un UUID válido.' }
    // )
    // served_by?: string;

}


