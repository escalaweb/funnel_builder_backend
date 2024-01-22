import { ToolSetting_Type } from "../../funnels/interfaces";

export interface CST_Dash_I {
    dates: {
        begin: number,
        end: number
    },
    porcentCompletion: number,
    daysLeftCompletion: number,
    daysTotalCompletion: number,
    totalActions: number,
}



export const CST_ActionSettings_Type_Default = [
 "user_invitation",
    "user_roles_customization",
    "date_format",
    "time_zone",
    "currency",
    "email_account",
    "email_account_company",
    "database_migration",
    "email_domain",
    "create_senders",
    "create_subscription_types",
    "create_email_signatures",
    "domain_website",
    "footer_website",
    "disable_watermark",
    "insert_form_external_page",
    "conection_whatsapp_cloud_api",
    "synchronization_templates",
    "chrome_extension",
    "meta_business_manager",
    "conection_facebook_lead_ads",
    "pixel_facebook",
    "google_analytics",
    "tag_manager",
    "import_facebook_campaigns",
    "zapier",
    "calendly",
    "integrations_other_tools",
] as const;
export type CST_ActionSettings_Type = typeof CST_ActionSettings_Type_Default[number];

export interface CST_ActionsSettings_I {

    type: CST_ActionSettings_Type;
    status: boolean;
    note: string;

}

export interface CST_ToolSettingsConfig_I {
    type: ToolSetting_Type,
    actionsSettings: CST_ActionsSettings_I[],
    date: number,
}

export interface Config_Step_I {
    dash: CST_Dash_I;
    toolsSettingsConfig: CST_ToolSettingsConfig_I[]
    _id?: string;
    __v?: number;
}