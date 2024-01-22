

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { EntityKey_et } from "../../../common/entities";
import { FunnelItem_I, FunnelMetricsPorcents_I, FunnelStage_Item_Type, Funnel_TimingMetrics_Type, StageItems_Metrics_I, ToolSetting_I, ToolSettingsOrganization_I } from "../interfaces";
import { FunnelLibrary_et } from "../../funnel-library/entities/funnel-library.entity";
import { DateProcessService } from "../../../common/adapters";
import { CustomizeProcess_et } from "../../customize-process/entities";
import { FunnelArchive_et } from '../../funnel_archives/entities/funnel-archive.entity';

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

    @OneToOne(() => CustomizeProcess_et, CustomizeProcess => CustomizeProcess.funnel_id, { cascade: true })
    @JoinColumn({
        name: 'customizeProcess_step_id'
    })
    customizeProcess_step_id: CustomizeProcess_et;

    @ManyToOne(() => FunnelArchive_et, archive => archive.funnels_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'archives_id' })
    archives_id: FunnelArchive_et;

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
