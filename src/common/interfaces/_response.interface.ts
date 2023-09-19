


export interface _paginatorModel_I {

    meta: { [s: string]: any; itemCount: number; totalItems?: number; itemsPerPage: number; totalPages?: number; currentPage: number; },
    links: {
        first?: string;
        previous?: string;
        next?: string;
        last?: string;
    }

}


export interface _response_I<T = any> {

    ok?: boolean;
    statusCode?: number;
    path?: string;
    data?: T;
    message?: _responseMessage_I[];
    paginator?: _paginatorModel_I;
    err?: any;

}


const type_message_default = [
    "global",
    "inline",
] as const;

export type message_T = typeof type_message_default[number];

export interface _responseMessage_I {
    text: string;
    type: message_T;
    index?: string;
}