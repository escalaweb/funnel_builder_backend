
import * as fs from "fs";
import { parse } from "dotenv";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { _Configuration_Keys } from "./config.keys";
const dotenv = require("dotenv");
// dotenv.config();



@Injectable()
export class ConfigProjectService {

    private readonly envConfig: { [key: string]: string };

    constructor(
        private readonly _configService: ConfigService
    ) {

        let path: string = process.cwd();
        let isEnviroment: string = '';

        if (fs.existsSync(path + "/.env")) {

            isEnviroment = this._configService.get(_Configuration_Keys.ENVIROMENT);

            dotenv.config({ path: path + "/.env" })

            this.envConfig = parse(fs.readFileSync(path + "/.env"));

        } else if (fs.existsSync( path + "/.env.prod" )) {

            isEnviroment = this._configService.get(_Configuration_Keys.ENVIROMENT);

            dotenv.config({ path: path + "/.env.prod" })

            this.envConfig = parse(fs.readFileSync(path + "/.env.prod"));

        }

        if (isEnviroment != '') {
            this.setTypeEnviroment(isEnviroment)
            return;
        }

        isEnviroment = this._configService.get(_Configuration_Keys.ENVIROMENT)

        if( isEnviroment != ''){

            this.setTypeEnviroment(isEnviroment)
            return;

        }

        // entonces es docker

        /*
        if (fs.existsSync(path + "/.env")) {
            console.log('dev exist')
            dotenv.config({ path: path + "/.env" })

            this.envConfig = parse(fs.readFileSync(path + "/.env"));

            global._prod = false;

        } else if (fs.existsSync(path + "/.env.prod")) {
            console.log('prod exist')
            dotenv.config({ path: path + "/.env.prod" })

            this.envConfig = parse(fs.readFileSync(path + "/.env.prod"));

            global._prod = false;

        } else {

            console.log(".env or .env.prod file does not exist");
            return process.exit(0);

        }
        isDevelopmentEnv = this._configService.get(_Configuration_Keys.ENVIROMENT);

        // return process.exit(0);

        if (isDevelopmentEnv === 'developer') {

            this.envConfig = parse(fs.readFileSync(path + "/.env"));

            global._prod = false;

        } else if (isDevelopmentEnv === 'production') {

            this.envConfig = parse(fs.readFileSync(path + "/.env.prod"));

            global._prod = true;

        }

        console.log('Global Prod', global._prod);
        */
    }


    setTypeEnviroment(isDevelopmentEnv: string) {

        if (isDevelopmentEnv === 'developer') {

            global._prod = false;

        } else if (isDevelopmentEnv === 'production') {

            global._prod = true;

        }else{
             global._prod = false;
        }


    }

    _get(_configkey: _Configuration_Keys): string {
        return this._configService.get(_configkey);
    }

}
