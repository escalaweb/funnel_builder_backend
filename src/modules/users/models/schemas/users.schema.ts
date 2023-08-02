import * as dynamoose from "dynamoose";

import { v4 as uuidv4 } from 'uuid';
import { _blank_dateTypeModel, _init_dateTypeModel } from "../../../../common/schemas/date.schema";


export const UserSchema = new dynamoose.Schema({

    _id: {
        type: String,
        hashKey: true,
        required: true,
        default: uuidv4,
    },
    username_id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Object,
        schema: _init_dateTypeModel,
        default: {}
    },
    lastAccessAt: {
        type: Object,
        schema: _blank_dateTypeModel,
        default: {}
    }

});





