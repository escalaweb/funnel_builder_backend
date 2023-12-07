import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { FunnelBody_et } from "../../funnels/entities";
import { DateProcessService } from "../../../common/adapters";
import { User_et } from "../../users/entities";
import { ConfigPlanner_et } from "../../planner/entities";
import { LibraryPermisions_et } from "../../library-permisions/entities";


@Entity({
    name: "funnels_library"
})
export class FunnelLibrary_et extends EntityKey_et {

    @Column({
        type: "varchar",
    })
    name?: string;

    @OneToMany(() => FunnelBody_et, funnels => funnels.funnelLibrary_id, { cascade: true })
    funnels_id: FunnelBody_et[];

    @Column({
        type: 'varchar',
        default: new DateProcessService().setDate()
    })
    createdAt?: string;

    @OneToOne( () => ConfigPlanner_et, configStep => configStep.funnelLibrary_id )
    @JoinColumn({
        name: 'config_step_id'
    })
    config_step_id: ConfigPlanner_et;

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
    user_id: User_et

    @OneToMany(
        () => LibraryPermisions_et,
        ( funnelLibraryPermision ) => {
            funnelLibraryPermision.funnelLibrary_id
        },
        {
            cascade: true
        }
    )
    funnel_library_permision_id?: LibraryPermisions_et[]

}
