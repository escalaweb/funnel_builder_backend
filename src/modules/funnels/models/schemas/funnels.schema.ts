import { Schema } from "dynamoose";

// const { v4: uuidv4 } = require('uuid');

import { v4 as uuidv4 } from 'uuid';


const itemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    typeFunnel: {
        type: String
    },
    selected: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        required: false
    },
    selectStyle: {
        type: String,
        required: false
    },
    settings: {
        type: Array,
        required: false
    },
})
const stagesSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    items: {
        type: Array
    }
})


const relationsSchema = new Schema({
    porcent: {
        type: Number,
        required: true
    }
})

export const funnelSchema = new Schema({

    _id: {
        type: String,
        hashKey: true,
        required: true,
        default: uuidv4
    },

    funnel_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    stages: {
        type: Array,
        schema: [stagesSchema]
    },
    relations: {
        type: Array,
        schema: [relationsSchema]
    }

});



