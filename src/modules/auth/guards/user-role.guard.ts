// import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";
// import { META_ROLES } from "../decorators/role-protect.decorator";


// @Injectable()
// export class UserRoleGuard implements CanActivate {

//     constructor(
//         private readonly reflector: Reflector
//     ) {

//     }


//     canActivate(
//         context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {

//         const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

//         if (!validRoles) return true;
//         if (validRoles.length === 0) return true;

//         const req = context.switchToHttp().getRequest();

//         const user = req.user;

//         if (!user) {

//             throw new BadRequestException('User not found');

//         }


//         if (validRoles.includes(user.rol)) {
//             return true
//         }


//         throw new ForbiddenException(`User need a valid role, [${validRoles}]`);

//     }
// }
