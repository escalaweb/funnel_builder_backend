import { Entity, Column, JoinColumn, OneToOne, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";
import { EntityKey_Ety, _blank_dateTypeModel, _init_dateTypeModel } from "../../../../common/entities";
import { DateTypeModel_I } from "../../../../common/schemas/date.schema";
import { DateProcessService } from "../../../../common/adapters";

const _dateService = new DateProcessService();


@Entity({
    name: "users"
})
export class User_Ety extends EntityKey_Ety {

    @Column({ type: "varchar" })
    username_id: string;

    @Column({
        type: 'json',
    })
    createdAt: _init_dateTypeModel;

    @Column({
        type: 'json',
    })
    lastAccessAt: _blank_dateTypeModel;


    // constructor() {
    //     super();
    //     this.createdAt = new _init_dateTypeModel();
    // }


    @BeforeInsert()
    beforeInsert() {

        // this.createdAt = structuredClone(_init_dateTypeModel);
        // this.lastAccessAt = structuredClone(_blank_dateTypeModel);

        this.createdAt = new _init_dateTypeModel();
        this.lastAccessAt = new _blank_dateTypeModel();

    }


}



//    @Column('json')
    // meeting_files?: MeetingFiles_et[];