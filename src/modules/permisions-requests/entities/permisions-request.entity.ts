import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { DateProcessService } from '../../../common/adapters/dateProcess.service';
import { EntityKey_et } from "../../../common/entities";
import { FunnelArchive_et } from '../../funnel_archives/entities/funnel-archive.entity';
import { FunnelLibrary_et } from "../../funnel-library/entities";
import { PermisionRequest_Reasons_I } from "../interfaces";
import { User_et } from "../../users/entities";

@Entity({
    name: "permisions_requests"
})
export class PermisionsRequest_et extends EntityKey_et {

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

    @Column({
        type: 'boolean',
        default: false
    })
    answered: boolean;

    @ManyToOne(
        () => FunnelLibrary_et, funnelLibrary => funnelLibrary.permision_request_id,
        {
            onDelete: 'CASCADE',
            nullable: true
        })
    @JoinColumn({ name: 'funnelLibrary_id' })
    funnelLibrary_id?: FunnelLibrary_et;

    @ManyToOne(
        () => User_et, (user) => user.permisions_requested_by_id,
        {
            onDelete: 'CASCADE',
        })
    @JoinColumn({ name: 'requested_by' })
    requested_by: User_et

    @ManyToOne(
        () => User_et, (user) => user.permisions_served_by_id,
        {
            onDelete: 'CASCADE',
            nullable: true
        })
    @JoinColumn({ name: 'served_by' })
    served_by?: User_et

}


  // @ManyToOne(
    //     () => FunnelArchive_et, archive => archive.permision_request_id,
    //     {
    //         onDelete: 'CASCADE',
    //         nullable: true
    //     })
    // @JoinColumn({ name: 'funnelLibrary_id' })
    // archive_id?: FunnelArchive_et;