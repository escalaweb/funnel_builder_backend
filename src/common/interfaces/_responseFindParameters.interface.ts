

export interface PopulateRequest {
    path: string;
    model: string;
    populate?: PopulateRequest[];
}





export interface _argsFind<T = any> {
    findObject: T;
    populate?: PopulateRequest[];
    select?: any;
}

export interface _argsFindByText {
    arg: string,
    findObject?: any;
    populate?: any;
    select?: any;
}

