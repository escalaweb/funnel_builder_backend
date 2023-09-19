import { FindManyOptions, FindOneOptions } from "typeorm";


export interface PopulateRequest {
    path: string;
    model: string;
    populate?: PopulateRequest[];
}





export interface _argsFind_I<T = any> {
    findObject: FindOneOptions<T>;
    // populate?: PopulateRequest[];
    // relations?: string[];
    // select?: any;
    // order?: any;
}

export interface _argsFindMany_I<T = any> {
    findObject: FindManyOptions<T>;
    // relations?: string[];
    // select?: any;
    // order?: any;
}

export interface _argsFindByText {
    arg: string,
    findObject?: any;
    populate?: any;
    select?: any;
}

