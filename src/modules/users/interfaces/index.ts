import { schemaKeys_I } from "../../../common/interfaces";

//
export interface User_I extends schemaKeys_I {
    username_id: string;
    _id?: string;
    createdAt?: string;
    lastAccessAt?: string;
}