import { schemaKeys_I } from "../../../common/interfaces";
import { DateTypeModel_I } from "../../../common/schemas/date.schema";



export interface FunnelLibrary_I extends schemaKeys_I{

    // _id: string;
    name: string;
    funnels?: string[];
    createdAt?: DateTypeModel_I;
    updatedAt?: DateTypeModel_I;
    user_id?: string;

}