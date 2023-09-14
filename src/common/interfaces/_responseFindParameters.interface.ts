import { FindOneOptions } from "typeorm";


export interface PopulateRequest {
    path: string;
    model: string;
    populate?: PopulateRequest[];
}





export interface _argsFind<T = any> {
    findObject: FindOneOptions<T>;
    // populate?: PopulateRequest[];
    relations?: string[];
    select?: any;
}

export interface _argsFindByText {
    arg: string,
    findObject?: any;
    populate?: any;
    select?: any;
}

