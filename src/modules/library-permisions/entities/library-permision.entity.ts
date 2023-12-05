import { EntityKey_et } from "../../../common/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { User_et } from "../../users/entities";

@Entity({
    name: "library_permisions"
})
export class LibraryPermision_et extends EntityKey_et {

    @Column({
        type: "varchar",
        default: "all"
    })
    elements_effect?: string;

    /*
        0: Read - Write - Delete - Create
        1: Read
        2: Read - Write
        3: Read - Write - Delete
     */
    @Column({
        type: "smallint",
        default: 0,
        nullable: true
    })
    type?: number;

     @Column({
        type: 'varchar',
        default: 0
    })
    updatedAt?: string;

    @OneToOne(() => FunnelLibrary_et, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funnelLibrary_id' })
    funnelLibrary_id: FunnelLibrary_et;

    @ManyToOne(
        () => User_et, (user) => user.funnelLibrary_id,
        {
            onDelete: 'CASCADE',
            // eager: true // Que cargue la siguiente relación siempre
        })
    @JoinColumn({ name: 'user_id' })
    user_id: User_et

}
