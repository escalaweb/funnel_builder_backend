import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { DateProcessService } from "../../../common/adapters";
import { User_et } from "../../users/entities";
import { LibraryPermisions_et } from "../../library-permisions/entities";
import { FunnelArchive_et } from "../../funnel_archives/entities/funnel-archive.entity";
import { PermisionsRequest_et } from "../../permisions-requests/entities/permisions-request.entity";


@Entity({
    name: "funnels_library"
})
export class FunnelLibrary_et extends EntityKey_et {

    @Column({
        type: "varchar",
    })
    name?: string;

    @Column({
        type: 'varchar',
        default: new DateProcessService().setDate()
    })
    createdAt?: string;

    @Column({
        type: 'varchar',
        default: 0
    })
    updatedAt?: string;

    @ManyToOne(
        () => User_et, (user) => user.funnelLibrary_id,
        {
            onDelete: 'CASCADE',
            // eager: true // Que cargue la siguiente relación siempre
        })
    @JoinColumn({ name: 'user_id' })
    user_id?: User_et;

    @OneToMany(() => FunnelArchive_et, archives => archives.funnelLibrary_id, { cascade: true })
    archives_id?: FunnelArchive_et[];

    @OneToMany( () => LibraryPermisions_et, permisions => permisions.funnelLibrary_id , { cascade: true })
    funnel_library_permision_id?: LibraryPermisions_et[]

    @OneToMany(
        () => PermisionsRequest_et,
        ( permision_request ) => {
            permision_request.funnelLibrary_id
        },
        {
            cascade: true
        }
    )
    permision_request_id?: PermisionsRequest_et

}
