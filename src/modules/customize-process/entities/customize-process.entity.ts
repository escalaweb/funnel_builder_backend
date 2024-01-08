import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { Customize_Stage_I } from "../interfaces";
import { FunnelBody_et } from "../../funnels/entities";

@Entity({
    name: "customize_process"
})
export class CustomizeProcess_et  extends EntityKey_et {

    @Column({
        type: "varchar",
    })
    name: string;

     @Column({
        type: 'jsonb',
    })
    stages: Customize_Stage_I[];

    @Column({
        type: "smallint",
        default: 0,
        nullable: true
    })
    pos?: number;

    @OneToOne(() => FunnelBody_et, funnel => funnel._id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funnel_id' })
    funnel_id: FunnelBody_et;

}
