

const process_customization_type_defaults = [
    "customization_criterion",
    "customization_objective",
    "customization_time_goal",
    "customization_responsible",
    "customization_channel",
    "customization_duration",
    "customization_communication_structure",
    "customization_script",
    "customization_asynchronous_communications",
    "customization_templates",
    "customization_automation",
    "customization_information_to_register",
    "customization_indicators",
    "customization_operational_flows",
    "customization_other",
    "customization_stage_title",
    "default"
] as const;
export type Process_Customization_Type = typeof process_customization_type_defaults[number];





export interface FunnelCustomizeBody_I {

    _id: string;
    name: string;
    stages: Customize_Stage_I[];
    funnel_id?: string;

}

export interface Customize_Stage_I {

    type: Process_Customization_Type,
    steps: Customize_Stage_StepsContain_I[]

}

export interface Customize_Stage_StepsContain_I {
    contain: {
        text: string;
    };
}

export interface Customize_Step_I {

    contain: {
        text: string;
    };
    type: Process_Customization_Type

}
