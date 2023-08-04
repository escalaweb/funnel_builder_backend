import { Schema } from "dynamoose";

// const { v4: uuidv4 } = require('uuid');

import { v4 as uuidv4 } from 'uuid';


const itemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    typeFunnel: {
        type: String
    },
    selected: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        required: false
    },
    selectStyle: {
        type: String,
        required: false
    },
    settings: {
        type: Array,
        required: false
    },
})
const stagesSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    items: {
        type: Array
    }
})


const relationsSchema = new Schema({
    porcent: {
        type: Number,
        required: true
    }
})

export const  funnelSchema = new Schema({

    _id: {
        type: String,
        hashKey: true,
        required: true,
        default: uuidv4
    },

    funnel_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    stages: {
        type: Array,
        schema: [stagesSchema]
    },
    relations: {
        type: Array,
        schema: [relationsSchema]
    }

});



// export interface FunnelBody_I {
//     funnel_id: string;
//     name: string;
//     type: string;
//     stages: StageItems_I[];
//     ts_organization: ToolSettingsOrganization_I[];
//     relations: FunnelRelationSwitch_I[];
//     config_step: CST_I;
// }



// export interface For_Back_Ward_I {
//     funnelModels: FunnelBody_I[];
//     status: boolean;
// }

// export type ToolSetting_Type = "crm" | "emails" | "whatsapp" | "landings" | "ads" | "integrations" | "automatizations";

// export interface ToolSettingsOrganization_I {
//     type: ToolSetting_Type,
//     priority: 1 | 2 | 3 | 4 | 5 | 6 | "N/A" | "Esperar" | null
//     collabs?: ToolSettingCollab_I[]
// }

// export interface CST_Dash_I {
//         dates: {
//             begin: any,
//             end: any
//         },
//         porcentCompletion: number,
//         daysLeftCompletion: number,
//         daysTotalCompletion: number,
//         totalActions: number,
// }

// const type_array_default = [
//     "user_invitation",
//     "user_roles_customization",
//     "date_format",
//     "time_zone",
//     "currency",
//     "email_account",
//     "email_account_company",
//     "database_migration",
//     "email_domain_account",
//     "email_domain_account_company",
//     "email_domain",
//     "create_senders",
//     "create_subscription_types",
//     "create_email_signatures",
//     "domain_website",
//     "footer_website",
//     "conection_whatsapp_cloud_api",
//     "synchronization_templates",
//     "chrome_extension",
//     "meta_business_manager",
//     "conection_facebook_lead_ads",
//     "pixel_facebook",
//     "google_analytics",
//     "tag_manager",
//     "import_facebook_campaigns",
//     "zapier",
//     "integrations_other_tools",

// ] as const;
// export type CST_ActionSettings_Type = typeof type_array_default[number];

// export interface CST_ActionsSettings_I {

//     type: CST_ActionSettings_Type;
//     status: boolean;
//     note: string;

// }

// export interface CST_ToolSettingsConfig_I {
//     type: ToolSetting_Type,
//     actionsSettings: CST_ActionsSettings_I[],
//     date: any,
// }

// export interface CST_I {
//     dash: CST_Dash_I;
//     toolsSettingsConfig: CST_ToolSettingsConfig_I[]
// }



// export interface FunnelRelationSwitch_I {
//     porcent: number;
// }

// export interface ToolSettingCollab_I {
//     name: string;
// }

// export interface ToolSetting_I {
//     type: ToolSetting_Type,
//     status: boolean;
//     note?: string;
// }

// export interface ToolsSettingsStage_I {
//     crm?: boolean;
//     emails?: boolean;
//     whatsapp?: boolean;
//     landings?: boolean;
//     ads?: boolean;
//     integrations?: boolean;
//     automatizations: boolean;
// }

// export interface StageItems_I {
//     value: number;
//     type: string;
//     items: FunnelItem_I[];
//     tools?: ToolSetting_I[]
// }

// export interface FunnelItem_I {
//     name: string;
//     typeFunnel: string;
//     selected?: boolean;
//     icon?: string;
//     selectStyle?: string;
//     settings?: any;
// }


// export interface aux_preselect_I {

//     itemBody_index: number;
//     stageIndex: number;
//     elementIndex: number;

// }