import { Schema } from "dynamoose";

import { DateProcessService } from "../adapters";

import * as dynamoose from 'dynamoose';



const _dateService = new DateProcessService();


export interface DateTypeModel_I {
  date: string;
  type?: string;
}

export const _blank_dateTypeModel = new Schema({

    date: {
        type: String,
        required: false,
        default: null
    },

    type: {
        type: String,
        required: false,
        default: 'Date'
    }

})

export const _init_dateTypeModel = new Schema({

    date: {
        type: String,
        required: true,
        default: _dateService.setDate(),
    },

    type: {
        type: String,
        default: 'Date',
        required: false
    }

})


// export const _blank_dateTypeModel = new dynamoose.Schema({

//     date: {
//         type: String,
//         required: false,
//         default: null
//     },

//     type: {
//         type: String,
//         required: false,
//         default: 'Date'
//     }

// })

// export const e_blank_dateTypeModel = dynamoose.model("_blank_dateTypeModel", _blank_dateTypeModel);

// export const _init_dateTypeModel = new dynamoose.Schema({

//     date: {
//         type: String,
//         required: true,
//         default: _dateService.setDate(),
//     },

//     type: {
//         type: String,
//         default: 'Date',
//         required: false
//     }

// })

// export const e_init_dateTypeModel = dynamoose.model("_init_dateTypeModel", _init_dateTypeModel);