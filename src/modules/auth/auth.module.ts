import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CommonModule } from "../../common/common.module";
import { _Configuration_Keys } from "../../config/config.keys";
// import { AuthController } from "./controllers/auth.controller";
import { AuthWsModule } from "./gateways/auth-ws.module";
// import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./controllers/auth.controller";


@Module({
    controllers: [
        AuthController
    ],
    providers: [
        // AuthService,
        JwtStrategy,

    ],
    imports: [
        ConfigModule,
        HttpModule,
        // PassportModule,
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
        }),
        // RolesModule,
        UsersModule,
        // CommonModule,
        // AuthWsModule,
    ],
    exports: [
        JwtStrategy,
        // AuthService,
        PassportModule,
        // JwtModule
    ],

})
export class AuthModule { }



