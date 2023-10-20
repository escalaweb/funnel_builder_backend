import { Entity, Column, JoinColumn, OneToOne, BeforeInsert, BeforeUpdate, AfterLoad, OneToMany } from "typeorm";
import { EntityKey_et, _blank_dateTypeModel, _init_dateTypeModel } from "../../../common/entities";
import { DateProcessService } from "../../../common/adapters";
import { FunnelLibrary_et } from "../../funnel-library/entities";



@Entity({
    name: "users"
})
export class User_et extends EntityKey_et {

    @Column({
        type: "varchar",
        unique: true
     })
    username_id?: string;

    @Column({
        type: "varchar",
        unique: false
     })
    tenant_id?: string;

    @Column({
        type: "varchar",
     })
    name?: string;

    // @Column({
    //     type: "varchar",
    //     nullable: true
    //  })
    // test2?: string;

    @Column({
        type: "varchar",
     })
    email?: string;

    @Column({
        type: 'varchar',
        default: new DateProcessService().setDate()
    })
    createdAt?: string;

    @Column({
        type: 'varchar',
        default: 0
    })
    lastAccessAt?: string;

    @OneToMany(
        () => FunnelLibrary_et,
        ( funnelLibrary ) => {
            funnelLibrary.user_id
        },
        {
            cascade: true
        }
    )
    funnelLibrary_id?: FunnelLibrary_et



    // constructor() {
    //     super();
    //     this.createdAt = new _init_dateTypeModel();
    // }



    /*

    @BeforeInsert()
    beforeInsert() {

        // this.createdAt = structuredClone(_init_dateTypeModel);
        // this.lastAccessAt = structuredClone(_blank_dateTypeModel);

        // this.createdAt = new _init_dateTypeModel();
        // this.lastAccessAt = new _blank_dateTypeModel();

    }
    */

}

