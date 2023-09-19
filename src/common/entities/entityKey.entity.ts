import { Column, PrimaryGeneratedColumn } from "typeorm";


export class EntityKey_et {

    @PrimaryGeneratedColumn("uuid")
    _id?: string;

    @Column({
        type: "smallint",
        default: 0
    })
    __v?: number;


}