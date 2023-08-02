




export interface _response_I<T> {

    ok?: boolean;
    statusCode?: number;
    path?: string;
    data?: T;
    message?: _responseMessage_I[];
    paginator?: any;
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