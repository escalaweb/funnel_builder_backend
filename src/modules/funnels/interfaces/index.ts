import { schemaKeys_I } from "../../../common/interfaces";


const type_settings_default = ["facebook_ads","google_ads","prospection","youtube_ads","linkedin_ads","cold_calling","banner_ads","event_participation","fisic_visit","organic_publication_sn","blog","whatsapp_received","received_call","received_email","received_sms","received_sn_message","website_chat","seo","other","whatsapp_sent","sms_sent","outgoing_calls","email_sent","dm_sn_sent","landing_page","website","popup_selection","contact_form","whatsapp_button","facebook_lead_form","new_contact","google_form","form_profiling","popup_form","video_page","info_page","form_page","scheduling_page","ecommerce_page","pay_page","email_post_register","whatsapp_post_register","page_upload_file","contact_prequalifier","prequalified","contact_seller","qualified","scheduling","demo","session_free","date","visit","test","followup","negotiation","needs_analysis","proposal","deposit","waiting_payment","presentation","shipping_quote","page_shopping_cart","email_shopping_cart_abandoned","approval","bill_invoice","information_collected","free_class","payment_link","event","session_fisic","session_online","service_product_delivery","service_calling","contact_satisfaction","contact_renewal_repurchase","proposal_sent","renew_buy_back","expansion","cross_selling","none","newSale","reSale","implementation","adoption","handoff","default"
] as const;
export type FunnelStage_Item_Type = typeof type_settings_default[number];


// extends schemaKey_I{
export type ToolSetting_Type = "crm" | "emails" | "whatsapp" | "landings" | "ads" | "integrations" | "automatizations";
export type ToolSetting_priority_Type = 1 | 2 | 3 | 4 | 5 | 6 | "N/A" | "Esperar" | null;

export interface ToolSettingsOrganization_I {
    type: ToolSetting_Type;
    priority: ToolSetting_priority_Type;
    collabs?: ToolSettingCollab_I[];
}



export interface FunnelBody_I {
    funnel_id: string;
    name: string;
    type: string;
    stages: StageItems_I[];
    organization_tools_step: ToolSettingsOrganization_I[];
    relations: FunnelRelationSwitch_I[];
    customizeProcess_id?: string;
    config_step_id?: string;
    __v?: number;
}

export interface FunnelRelationSwitch_I {
    income_porcent: number;
    value_porcent: number;
    goal_porcent: number;
}

export interface ToolSettingCollab_I {
    name: string;
}

export interface ToolSetting_I {
    type: ToolSetting_Type,
    status: boolean;
    note?: string;
}

export interface ToolsSettingsStage_I {
    crm?: boolean;
    emails?: boolean;
    whatsapp?: boolean;
    landings?: boolean;
    ads?: boolean;
    integrations?: boolean;
    automatizations: boolean;
}

export interface StageItems_Value_I {
    income_value: number;
    value_value: number;
    goal_value: number;
}

export interface StageItems_I {
    value: StageItems_Value_I;
    type: string;
    items: FunnelItem_I[];
    tools?: ToolSetting_I[]
}

export interface FunnelItem_I {
    name: string;
    typeFunnel: FunnelStage_Item_Type;
    selected?: boolean;
    icon?: string;
    selectStyle?: string;
    settings?: any;
}


export interface aux_preselect_I {

    itemBody_index: number;
    stageIndex: number;
    elementIndex: number;

}