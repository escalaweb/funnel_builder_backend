import { PopulateRequest } from "../helpers/dynamoose.helper.service";




export interface _argsAggregateFind {

}
    export interface _argsFind {
    findObject: any;
    populate?: PopulateRequest[];
    select?: any;
}

export interface _argsFindByText {
    arg: string,
    findObject?: any;
    populate?: any;
    select?: any;
}

