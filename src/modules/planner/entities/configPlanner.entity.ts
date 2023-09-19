import { Entity, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { CST_Dash_I, CST_ToolSettingsConfig_I } from "../interfaces";
import { FunnelBody_et } from "../../funnels/entities";
import { FunnelLibrary_et } from "../../funnel-library/entities";

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


    @OneToOne(() => FunnelLibrary_et, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funnelLibrary_id' })
    funnelLibrary_id: FunnelLibrary_et;





}