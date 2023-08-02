import { schemaKey_I } from "../../../common/interfaces/_dynamoose.interface";
import { DateTypeModel_I } from "../../../common/schemas/date.schema";
import { FunnelBody_I } from "../../funnels/interfaces";



export interface FunnelLibrary_I extends schemaKey_I{

    // _id: string;
    name: string;
    funnels?: string[];
    createdAt?: DateTypeModel_I;
    updatedAt?: DateTypeModel_I;
    user_id?: string;

}