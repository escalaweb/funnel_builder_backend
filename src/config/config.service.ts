
import * as fs from "fs";
import { parse } from "dotenv";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { _Configuration_Keys } from "./config.keys";
const dotenv = require("dotenv");
// dotenv.config();


export type typeEnviroments = 'development' | 'production' | 'staging' | 'none';


@Injectable()
export class ConfigProjectService {

    private readonly envConfig: { [key: string]: string };

    private _configService: ConfigService = new ConfigService();

    constructor(
    ) {

        let path: string = `${process.cwd()}/env/`;
        let isEnviroment: typeEnviroments = 'none';


        switch (process.env.NODE_ENV) {


            case "development":
                // isEnviroment = this._configService.get(_Configuration_Keys.NODE_ENV);
                dotenv.config({ path: path + ".env" })
                this.envConfig = parse(fs.readFileSync(path + ".env"));

                break;
            case "staging":
                isEnviroment = this._configService.get(_Configuration_Keys.NODE_ENV);
                dotenv.config({ path: path + ".env.staging" })
                this.envConfig = parse(fs.readFileSync(path + ".env.staging"));

                break;
            case "production":
                // isEnviroment = this._configService.get(_Configuration_Keys.NODE_ENV);
                // dotenv.config({ path: path + ".env.prod" })
                // this.envConfig = parse(fs.readFileSync(path + ".env.prod"));

                break;

            default:
                break;

        }

        // if (fs.existsSync(path + "/.env")) {

        //     isEnviroment = this._configService.get(_Configuration_Keys.NODE_ENV);

        //     dotenv.config({ path: path + "/.env" })

        //     this.envConfig = parse(fs.readFileSync(path + "/.env"));

        // } else if (fs.existsSync(path + "/.env.prod")) {

        //     isEnviroment = this._configService.get(_Configuration_Keys.NODE_ENV);

        //     dotenv.config({ path: path + "/.env.prod" })

        //     this.envConfig = parse(fs.readFileSync(path + "/.env.prod"));

        // }

        // if (isEnviroment != 'none') {
        //     this.setTypeEnviroment(isEnviroment)
        //     return;
        // }

        isEnviroment = this._configService.get(_Configuration_Keys.NODE_ENV)

        if (isEnviroment != 'none') {

            this.setTypeEnviroment(isEnviroment)
            return;

        }

        // entonces es docker


    }

    setTypeEnviroment(typeEnviroment: typeEnviroments) {

        switch (typeEnviroment) {
            case "development":
                global._prod = false;
                global._staging = false;
                global._local = true;
                break;

            case "production":
                global._prod = true;
                global._staging = false;
                global._local = true;
                break;

            case "staging":
                global._prod = false;
                global._staging = true;
                global._local = false;
                break;

            default:
                global._prod = false;
                global._staging = false;
                global._local = true;
                break;
        }


    }

    _get(_configkey: _Configuration_Keys): string {
        return this._configService.get(_configkey);
    }

}
