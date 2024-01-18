import { EntityKey_et } from "../../../common/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { User_et } from "../../users/entities";
import { DateProcessService } from "../../../common/adapters";

@Entity({
    name: "library_permisions"
})
export class LibraryPermisions_et extends EntityKey_et {
    @Column({
        type: 'varchar',
        default: 'all'
    })
    elementsEffect?: string;

    /*
        0: Read - Write - Delete - Create (owner)
        1: Read
        2: Read - Write
        3: Read - Write - Delete
        4: No access
     */
    @Column({
        type: "smallint",
        default: 0,
    })
    permisionType?: number;

    @Column({
        type: 'varchar',
        default: 0
    })
    updatedAt?: string;

    // @ManyToOne(() => FunnelLibrary_et, funnel => funnel.funnel_library_permision_id, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'funnelLibrary_id' })
    // funnelLibrary_id?: FunnelLibrary_et;

    @ManyToOne(() => FunnelLibrary_et, funnelLibrary => funnelLibrary.funnel_library_permision_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funnelLibrary_id' })
    funnelLibrary_id?: FunnelLibrary_et;

    @ManyToOne(
        () => User_et, (user) => user.funnelLibrary_id,
        {
            onDelete: 'CASCADE',
            // eager: true // Que cargue la siguiente relación siempre
        })
    @JoinColumn({ name: 'user_id' })
    user_id?: User_et
}

