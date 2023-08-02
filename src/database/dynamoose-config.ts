import { DynamooseModule } from 'nestjs-dynamoose';

import { _Configuration_Keys } from "../config/config.keys";
import { ConfigProjectService } from "../config/config.service";

import { ConfigModule, ConfigService } from '@nestjs/config';



const _config = new ConfigProjectService(new ConfigService());


// interface DynamooseModuleOptions {
//     aws?: {
//         accessKeyId?: string;
//         secretAccessKey?: string;
//         region?: string;
//     };
//     local?: boolean | string;
//     ddb?: DynamoDB;
//     table?: TableOptionsOptional;
//     logger?: boolean | LoggerService;
// }

    // aws: {
    //     //   accessKeyId: 'your-access-key-id',
    //     //   secretAccessKey: 'your-secret-access-key',
    //     //   region: 'your-region'
    //     // accessKeyId: _config._get(_Configuration_Keys.AWS_ACCESS_KEY_ID),
    //     // secretAccessKey: _config._get(_Configuration_Keys.AWS_SECRET_ACCESS_KEY),
    //     region: _config._get(_Configuration_Keys.AWS_REGION),
    // },
    // local: true,
let config: any = {

    local: _config._get(_Configuration_Keys.IS_DDB_LOCAL) === 'true',
    aws: {
        region: _config._get(_Configuration_Keys.AWS_REGION)
    },
    // table: {
    //     create: _config._get(_Configuration_Keys.IS_DDB_LOCAL) === 'true',
    //     prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
    //     suffix: '-table',
    // },
}



export const _DYNAMOOSE_MODULE = DynamooseModule.forRoot(config);