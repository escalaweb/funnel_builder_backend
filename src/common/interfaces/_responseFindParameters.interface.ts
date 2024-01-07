import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { FindManyOptions, FindOneOptions } from "typeorm";



export interface _Populate_I {
    [key: string]: {
        select: string[];
        populate?: _Populate_I;
    };
}


export interface PopulateRequest {
    path: string;
    model: string;
    populate?: PopulateRequest[];
}


export interface _argsFind_I<T = any> {
    findObject: FindOneOptions<T>;
    populate?: _Populate_I;
    // relations?: string[];
    // select?: any;
    // order?: any;
}

export interface _argsFindMany_I<T = any> {
    findObject: FindManyOptions<T>;
    options?: IPaginationOptions,
    populate?: _Populate_I;
    // relations?: string[];
    // select?: any;
    // order?: any;
}

export interface _argsFind_IByText {
    arg: string,
    findObject?: any;
    populate?: any;
    select?: any;
}

