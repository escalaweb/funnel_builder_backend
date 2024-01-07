import { schemaKeys_I } from "../../../common/interfaces";

//
export interface User_I extends schemaKeys_I {
    _id?: string;
    username_id: string;
    tenant_id: string;
    email: string;
    name: string;
    createdAt?: string;
    lastAccessAt?: string;
}

export interface User_Escala_I {
    confirmed: boolean;
    created: string;
    created_by: string;
    email: string;
    enabled: boolean;
    id: string;
    metadata: null;
    modified: string;
    modified_by: string;
    name: string;
    tenant_id: string;
    properties?: any;
}

export interface User_Escala_Request_I {
    data: User_Escala_I[],
    page?: 0,
    size?: 100,
    total?: 3
}


