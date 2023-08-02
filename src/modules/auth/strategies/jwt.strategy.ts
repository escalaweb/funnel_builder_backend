import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";
import { _response_I } from "../../../common/interfaces";
import { _argsFind } from "../../../common/interfaces/_responseFindParameters.interface";
import { _Configuration_Keys } from "../../../config/config.keys";

import { HttpService } from '@nestjs/axios';
import { map } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { find } from "lodash";
import { AuthPayload_I, CognitoPayload_I } from "../interfaces/_jwt-payload.interface";

import * as jwkToPem from 'jwk-to-pem';

import { UsersService } from "../../users/services/users.service";
import { User_I } from "../../users/interfaces";
import * as dynamoose from 'dynamoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(
        private readonly httpService: HttpService,
        private readonly _configService: ConfigService,
        private readonly _usersService: UsersService
    ) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKeyProvider: (_, token, done) => {

                const aws_region: string = this._configService.get(_Configuration_Keys.REGION),
                    aws_userPool: string = this._configService.get(_Configuration_Keys.USERPOOLID);

                const jwksUri = `https://cognito-idp.${aws_region}.amazonaws.com/${aws_userPool}/.well-known/jwks.json`;

                this.httpService
                    .get(jwksUri)
                    .pipe(
                        map((response) => {
                            const {
                                data: { keys },
                            } = response;
                            const tokenSections = (token || '').split('.');
                            if (tokenSections.length < 2) {
                                throw Error('something went wrong');
                            }
                            const headerJSON = Buffer.from(
                                tokenSections[0],
                                'base64',
                            ).toString('utf8');
                            const header = JSON.parse(headerJSON);
                            const jwk: any = find(keys, (key) => key.kid === header.kid);

                            if (!jwk) {
                                throw Error('something went wrong');
                            }
                            return jwkToPem(jwk);
                        }),
                    )
                    .subscribe({
                        next(pem) {
                            // console.log('que viene aqui pem', pem)}
                            done(null, pem);
                        },
                        error(err) {
                            // console.log('que viene aqui err', err)}
                            done(err.message, null);
                        },
                    });
            },
        });
    }

    async validate(payload: CognitoPayload_I) {

        console.log('el payload completo', payload);

        let newPayload: AuthPayload_I = {
            "_id": '',
            "username_id": payload["sub"],
        }

        await this._usersService.findOneByTerm({
            username_id: newPayload.username_id,
        }).then(async (response) => {

            console.log('response', response);

            if (response.statusCode != 200 || (response.data === undefined || response.data === null)) {

                await this._usersService.create({
                    username_id: newPayload.username_id,
                }).then();

            }else{

                newPayload._id = response.data._id;

            }

        });

        return newPayload;

    }


}