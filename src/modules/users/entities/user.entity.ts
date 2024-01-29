import { Entity, Column, JoinColumn, OneToOne, BeforeInsert, BeforeUpdate, AfterLoad, OneToMany } from "typeorm";
import { EntityKey_et, _blank_dateTypeModel, _init_dateTypeModel } from "../../../common/entities";
import { DateProcessService } from "../../../common/adapters";
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { LibraryPermisions_et } from "../../library-permisions/entities/library-permision.entity";
import { PermisionsRequest_et } from "../../permisions-requests/entities/permisions-request.entity";



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

    @OneToMany(
        () => LibraryPermisions_et,
        ( funnelLibraryPermisions ) => {
            funnelLibraryPermisions.user_id
        },
        {
            cascade: true
        }
    )
    funnel_library_permisions_id?: LibraryPermisions_et

    @OneToMany(
        () => PermisionsRequest_et,
        ( permision_request ) => {
            permision_request.requested_by
        },
        {
            cascade: true
        }
    )
    permisions_requested_by_id?: PermisionsRequest_et

    @OneToMany(
        () => PermisionsRequest_et,
        ( permision_request ) => {
            permision_request.served_by
        },
        {
            cascade: true
        }
    )
    permisions_served_by_id?: PermisionsRequest_et




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

