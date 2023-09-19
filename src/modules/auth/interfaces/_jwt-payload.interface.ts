

export interface JwtPayload_I {

    email: string;
    _id: string;
    rol: string;

}

export interface CognitoPayload_I {
    "escala:support": string;
    "sub": string;
    "email_verified": boolean;
    "escala:customer": Cognito_EsalaCustomer_I;
    "iss": string;
    "phone_number_verified": boolean;
    "cognito:username": string;
    "escala:readonly": string;
    "custom:tenantId": string;
    "aud": string;
    "event_id": string;
    "token_use": string;
    "auth_time": number;
    "escala:addons": string;
    "name": string;
    "phone_number": string;
    "escala:features": string;
    "exp": number;
    "iat": number;
    "email": string;
    "escala:perms": string;
}

export interface Cognito_EsalaCustomer_I {
    timezone: null;
    currency: null;
    locale: null;
    lang: string;
    payment: Cognito_EsalaCustomer_Payment_I;
}

export interface Cognito_EsalaCustomer_Payment_I {
    valid: boolean;
    grace: null;
    updateUtc: Date;
    customerId: null;
    subscriptionId: null;
}


export interface AuthPayload_I{
    "_id": string;
    "name": string;
    "email": string;
    "username_id": string;
    "tenant_id": string;
}