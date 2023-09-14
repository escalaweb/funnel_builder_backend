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