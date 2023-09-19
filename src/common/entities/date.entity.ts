import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DateProcessService } from "../adapters";
import { EntityKey_et } from ".";


const _dateService = new DateProcessService();

export class _blank_dateTypeModel {

    // @Column({
    //     type: "varchar",
    //     default: ""
    // })
    date: string;

    // @Column({
    //     type: "varchar",
    //     default: "Date"
    // })
    type: string;

    constructor(
        date = '',
        type = "Date"
    ) {

        this.date = date;
        this.type = type;
    }


}


export class _init_dateTypeModel {


    // @Column({
    //     type: "varchar",
    //     default: _dateService.setDate()
    // })
    date: string;

    // @Column({
    //     type: "varchar",
    //     default: "Date",
    // })
    type: string;

    constructor(
        date = _dateService.setDate(),
        type = "Date"
    ) {
        this.date = date;
        this.type = type;
    }



}