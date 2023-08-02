"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfigurations = void 0;
const EnvConfigurations = () => ({
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 3750,
    LOG_LEVEL: process.env.LOG_LEVEL,
    ENVIROMENT: process.env.ENVIROMENT || 'developer',
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
    STAGE: process.env.STAGE
});
exports.EnvConfigurations = EnvConfigurations;
//# sourceMappingURL=app.config.js.map