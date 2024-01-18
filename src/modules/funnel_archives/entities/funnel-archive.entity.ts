import { Entity, Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { DateProcessService } from '../../../common/adapters/dateProcess.service';
import { FunnelBody_et } from "../../funnels/entities";
import { ConfigPlanner_et } from "../../planner/entities";
import { User_et } from "../../users/entities";
import { FunnelLibrary_et } from "../../funnel-library/entities";



@Entity({
    name: "funnels_archive"
})
export class FunnelArchive_et extends EntityKey_et {

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

    @OneToMany(() => FunnelBody_et, funnels => funnels.archives_id, { cascade: true })
    funnels_id?: FunnelBody_et[];

    @ManyToOne(() => FunnelLibrary_et, funnelLibrary => funnelLibrary.archives_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funnelLibrary_id' }) // Esta columna se creará en la tabla de libros
    funnelLibrary_id?: FunnelLibrary_et;

    @OneToOne( () => ConfigPlanner_et, configStep => configStep.archives_id )
    @JoinColumn({
        name: 'config_step_id'
    })
    config_step_id?: ConfigPlanner_et;

}