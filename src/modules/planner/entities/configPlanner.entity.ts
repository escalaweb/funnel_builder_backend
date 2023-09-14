import { Entity, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { CST_Dash_I, CST_ToolSettingsConfig_I } from "../interfaces";
import { FunnelBody_et } from "../../funnels/entities";

@Entity({
    name: "config_planner"
})
export class ConfigPlanner_et extends EntityKey_et {

    @Column({
        type: 'jsonb',
        nullable: true
    })
    dash: CST_Dash_I;

    @Column({
        type: 'jsonb',
    })
    toolsSettingsConfig: CST_ToolSettingsConfig_I[];

    @OneToMany(
        () => FunnelBody_et,
        ( funnel ) => {
            funnel.config_step_id
        },
        {
            // cascade: true
            //   onDelete: 'CASCADE',
        }
    )
    funnel_id?: FunnelBody_et[]


}