import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { FunnelBody_et } from "../../funnels/entities";
import { DateProcessService } from "../../../common/adapters";
import { User_et } from "../../users/entities";


@Entity({
    name: "funnels_library"
})
export class FunnelLibrary_et extends EntityKey_et {

    @Column({
        type: "varchar",
    })
    name?: string;

    // @OneToMany(() => FunnelBody_et, funnel => funnel._id, { cascade: true })
    // funnels?: FunnelBody_et[];


    //   @OneToMany(() => FunnelBody_et, funnel => funnel.funnelLibrary, { cascade: true })
    //   funnels: FunnelBody_et[];

    @OneToMany(() => FunnelBody_et, funnels => funnels.funnelLibrary_id, { cascade: true })
    funnels_id: FunnelBody_et[];

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

    // @Column({ type: 'varchar' })
    // user_id?: string;

    // @ManyToOne(() => User_et, user => user._id, { onDelete: 'CASCADE'  } )
    // @JoinColumn({ name: 'user_id' })
    // user?: User_et;

    @ManyToOne(
        () => User_et, (user) => user.funnelLibrary_id,
        {
            onDelete: 'CASCADE',
            // eager: true // Que cargue la siguiente relación siempre
        })
    @JoinColumn({ name: 'user_id' })
    user_id: User_et


}
