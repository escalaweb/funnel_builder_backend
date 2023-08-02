import { ConfigService } from "@nestjs/config";
import { _Configuration_Keys } from "./config.keys";
export declare class ConfigProjectService {
    private readonly _configService;
    private readonly envConfig;
    constructor(_configService: ConfigService);
    setTypeEnviroment(isDevelopmentEnv: string): void;
    _get(_configkey: _Configuration_Keys): string;
}
