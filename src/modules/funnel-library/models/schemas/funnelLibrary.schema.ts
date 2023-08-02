import { Schema } from "dynamoose";

// const { v4: uuidv4 } = require('uuid');

import { v4 as uuidv4 } from 'uuid';

import { _blank_dateTypeModel, _init_dateTypeModel } from "../../../../common/schemas/date.schema";


export const FunnelLibrarySchema = new Schema({

    _id: {
        type: String,
        hashKey: true,
        required: true,
        default: uuidv4,

    },
    name: {
        type: String,
        required: true
    },
    funnels: {
        type: Array,
        required: false,
        schema: [String]
    },

    createdAt: {
        type: Object,
        schema: _init_dateTypeModel,
        default: {}
    },

    updatedAt: {
        type: Object,
        schema: _blank_dateTypeModel,
        default: {},
        // default: {..._blank_dateTypeModel.getAttributeValue }
    },

    user_id: {
        type: String
    }


});






