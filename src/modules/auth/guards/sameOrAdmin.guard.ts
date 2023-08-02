import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SameUserOrAdminGuard implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean {

        const request = context.switchToHttp().getRequest();
        const { user } = request; //<- se obtiene el deshasheo del token
        const tokenID = user._id;
        const id = request.params.id;


        // console.log('que es request', request);
        // console.log('que es deshaseo', user);
        // se compara si el id del dueño del token es el mismo del id pasado por params
        // console.log('los reqs', request.params.id);

        if (user.rol === 'ADMIN_ROLE') {

            return true;

        } else if (((tokenID) && (id)) && (tokenID === id)) {

            return true;

        } else {
            throw new UnauthorizedException('Access denied')
            return false;


        }
    }
}
