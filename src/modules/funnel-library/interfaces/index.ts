import { schemaKeys_I } from "../../../common/interfaces";



export interface FunnelLibrary_I extends schemaKeys_I{

    name: string;
    funnels?: string[];
    createdAt?: any;
    updatedAt?: any;
    user?: string;

}