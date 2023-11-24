

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { FunnelItem_I, FunnelMetricsPorcents_I, FunnelStage_Item_Type, Funnel_TimingMetrics_Type, StageItems_Metrics_I, ToolSetting_I, ToolSettingsOrganization_I } from "../interfaces";
import { FunnelLibrary_et } from "../../funnel-library/entities/funnel-library.entity";
import { DateProcessService } from "../../../common/adapters";
import { CustomizeProcess_et } from "../../customize-process/entities";


@Entity({
    name: "funnels"
})
export class FunnelBody_et extends EntityKey_et {

    @Column({
        type: "varchar",
    })
    name: string;


    @Column({
        type: "varchar",
    })
    type: FunnelStage_Item_Type;



    @OneToMany(() => FunnelBody_stages_et, stage => stage.funnel_id, { cascade: true })
    stages: FunnelBody_stages_et[];

    @Column({
        type: 'jsonb',
    })
    organization_tools_step: ToolSettingsOrganization_I[]

    @Column({
        type: 'jsonb',
    })
    metricsPorcents: FunnelMetricsPorcents_I[];

    @OneToOne(() => CustomizeProcess_et, CustomizeProcess => CustomizeProcess.funnel_id)
    @JoinColumn({
        name: 'customizeProcess_step_id'
    })
    customizeProcess_step_id: CustomizeProcess_et;

    // @ManyToOne(() => ConfigPlanner_et, configStep => configStep.funnel_id)
    // @JoinColumn({ name: 'config_step_id' })
    // config_step_id?: ConfigPlanner_et;

        @Column({
        type: "smallint",
        default: 0,
        nullable: true
    })
    pos?: number;

    @Column({
        type: "varchar",
        default: "daily"
    })
    timingMetrics?: Funnel_TimingMetrics_Type;

    @ManyToOne(() => FunnelLibrary_et, funnelLibrary => funnelLibrary.funnels_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funnelLibrary_id' }) // Esta columna se creará en la tabla de libros
    funnelLibrary_id?: FunnelLibrary_et;

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

}

@Entity({
    name: "stages_funnel"
})
export class FunnelBody_stages_et extends EntityKey_et {

    @Column({
        type: "jsonb",
    })
    metrics: StageItems_Metrics_I;

    @Column({
        type: "varchar",
    })
    type: string;

    @Column({
        type: 'jsonb',
    })
    items: FunnelItem_I[];

    @Column({
        type: 'jsonb',
    })
    tools: ToolSetting_I[];

    @Column({
        type: "smallint",
        default: 0,
        nullable: true
    })
    pos?: number;

    @ManyToOne(() => FunnelBody_et, funnel => funnel.stages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'funnel_id' })
    funnel_id?: FunnelBody_et;


}
