


export const EnvConfigurations = () => ({

    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 3750,
    LOG_LEVEL: process.env.LOG_LEVEL,
    ENVIROMENT: process.env.ENVIROMENT || 'development',
    ALLOWEDORIGINS: process.env.ALLOWEDORIGINS,
    EMAILTEST: process.env.EMAILTEST || '',
    EMAILINFO: process.env.EMAILINFO || '',
    DEFAULT_LIMIT: process.env.DEFAULT_LIMIT || 12,

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,

    IS_DDB_LOCAL: process.env.IS_DDB_LOCAL === 'true',
    REGION: process.env.REGION,
    SERVICE: process.env.SERVICE,
    STAGE: process.env.STAGE,

    IDENTITYPOOLID: process.env.IDENTITYPOOLID,
    USERPOOLID: process.env.USERPOOLID,
    USERPOOLWEBCLIENTID: process.env.USERPOOLWEBCLIENTID,


    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,

    NODE_ENV: process.env.NODE_ENV,


})