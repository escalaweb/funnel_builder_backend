import { Entity, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { CST_Dash_I, CST_ToolSettingsConfig_I } from "../interfaces";
import { FunnelArchive_et } from "../../funnel_archives/entities";

@Entity({
    name: "config_planner"
})
export class ConfigPlanner_et extends EntityKey_et {

    @Column({
        type: 'jsonb',
        nullable: true
    })
    dash?: CST_Dash_I;

    @Column({
        type: 'jsonb',
    })
    toolsSettingsConfig?: CST_ToolSettingsConfig_I[];

    @OneToOne(() => FunnelArchive_et, archive => archive.config_step_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'archives_id' })
    archives_id?: FunnelArchive_et;

}