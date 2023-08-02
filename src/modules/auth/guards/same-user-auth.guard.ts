import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayload_I } from '../interfaces/_jwt-payload.interface';

@Injectable()
export class SameUserAuthGuard implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean {

        const request = context.switchToHttp().getRequest();

        let user: AuthPayload_I = request.user;

        const tokenID = user.username_id;
        const id = request.params.id;

        // se compara si el id del dueño del token es el mismo del id pasado por params
        // console.log('los reqs', request.params.id);

        if (((tokenID) && (id)) && (tokenID === id)) {
            return true;
        } else {

            throw new UnauthorizedException('Access denied')

            // return false;
        }

    }
}
