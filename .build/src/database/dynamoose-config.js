"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DYNAMOOSE_MODULE = void 0;
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const config_keys_1 = require("../config/config.keys");
const config_service_1 = require("../config/config.service");
const config_1 = require("@nestjs/config");
const _config = new config_service_1.ConfigProjectService(new config_1.ConfigService());
let config = {
    local: _config._get(config_keys_1._Configuration_Keys.IS_DDB_LOCAL) === 'true',
    aws: {
        region: _config._get(config_keys_1._Configuration_Keys.AWS_REGION)
    },
    table: {
        create: _config._get(config_keys_1._Configuration_Keys.IS_DDB_LOCAL) === 'true',
        prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
        suffix: '-table',
    },
};
exports._DYNAMOOSE_MODULE = nestjs_dynamoose_1.DynamooseModule.forRoot(config);
//# sourceMappingURL=dynamoose-config.js.map