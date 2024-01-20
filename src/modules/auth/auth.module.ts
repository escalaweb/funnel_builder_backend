import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { _Configuration_Keys } from "../../config/config.keys";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { HttpModule } from "@nestjs/axios";
import { AuthController } from "./controllers/auth.controller";
import { Auth_Rel_Module } from "./rel.module";
import { Db_Module } from "../../database/DB.module";
import { UsersModule } from "../users/users.module";

@Module({
    controllers: [
        AuthController
    ],
    providers: [
        JwtStrategy,

    ],
    imports: [
        Db_Module,
        Auth_Rel_Module,
        UsersModule,
        ConfigModule,
        HttpModule,
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),

        // JwtModule
        JwtModule.registerAsync({
            imports: [
                ConfigModule
            ],
            inject: [
                ConfigService
            ],
            useFactory: (configService: ConfigService) => {
                return {
                    // secret: configService.get(_Configuration_Keys.JWT_SECRET),
                    signOptions: {
                        expiresIn: '1D'
                    }
                }
            }
        })

    ],
    exports: [
        JwtStrategy,
        PassportModule,
    ],

})
export class AuthModule { }



