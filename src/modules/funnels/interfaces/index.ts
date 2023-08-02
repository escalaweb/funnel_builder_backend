import { schemaKey_I } from "../../../common/interfaces/_dynamoose.interface";


const type_settings_default = ["facebook_ads","google_ads","prospection","youtube_ads","linkedin_ads","cold_calling","banner_ads","event","fisic_visit","organic_publication_sn","blog","whatsapp_received","received_call","received_email","received_sms","received_sn_message","website_chat","other","whatsapp_sent","sms_sent","outgoing_calls","email_sent","dm_sn_sent","landing_page","website","contact_form","whatsapp_button","facebook_lead_form","video_page","info_page","form_page","scheduling_page","ecommerce_page","pay_page","contact_prequalifier","contact_seller","scheduling","demo","session_free","date","visit","test","followup","needs_analysis","proposal","deposit","presentation","shipping_quote","automatic_email","session_fisic","session_online","service_product_delivery","service_calling","contact_satisfaction","contact_renewal_repurchase","proposal_sent","renew_buy_back","expansion","cross_selling", "none"] as const;
export type type_funnel = typeof type_settings_default[number];

// extends schemaKey_I{

export interface FunnelBody_I extends schemaKey_I{
    funnel_id: string;
    name: string;
    type: string;
    stages: StageItems_I[];
    relations: FunnelRelationSwitch_I[];
}

export interface FunnelRelationSwitch_I {
    porcent: number;
}


export interface StageItems_I {
    value: number;
    type: string;
    items: FunnelItem_I[];
}

export interface FunnelItem_I {
    name: string;
    typeFunnel: type_funnel;
    selected?: boolean;
    icon?: string;
    selectStyle?: string;
    settings?: any
}
