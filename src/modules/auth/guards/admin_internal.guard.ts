import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { ADM_CODE } from "../../../common/constants";
import { AuthPayload_I } from "../interfaces";
import { ConfigProjectService } from "../../../config/config.service";
import { _Configuration_Keys } from "../../../config/config.keys";

@Injectable()
export class Admin_Internal_Guard implements CanActivate {

    _config = new ConfigProjectService();

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const request = context.switchToHttp().getRequest();
            const user: AuthPayload_I = request.user;
            const emailParam = request.params.email;
            const admCode = request.headers['adm-code'];
            const xApiKey = request.headers['x-api-key'];

            if (this._config._get(_Configuration_Keys.NODE_ENV) != 'development') {

                if(request.hostname.includes('internal.dev') || request.hostname.includes('internal.escala')){
                }else{
                    throw new UnauthorizedException('Access denied: Unable access to internal.');
                }

            }

            // Revisar si el correo del usuario es el correcto
            if (user?.email !== 'alvaro@escala.com') {
                throw new UnauthorizedException('Access denied: Incorrect user email.');
            }

            // Revisar si admCode y xApiKey son válidos
            if (admCode === ADM_CODE && xApiKey) {
                return true;
            } else {
                throw new UnauthorizedException('Access denied: Invalid credentials.');
            }

        } catch (error) {
            throw new UnauthorizedException('Not access', error);
        }

    }

}
