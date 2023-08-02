import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
// import { RoleType } from "../../roles/enum/roletype.enum";
import { SameUserAuthGuard, SameUserOrAdminGuard } from "../guards";
// import { UserRoleGuard } from "../guards/user-role.guard";
// import { RoleProtect } from "./role-protect.decorator";


export function Auth() {

    return applyDecorators(
        // RoleProtect(...roles),
        UseGuards(AuthGuard('jwt'))

        // UseGuards(AuthGuard, RolesGuard),
        // ApiBearerAuth(),
        // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function Auth_SameID() {

    return applyDecorators(
        // RoleProtect(...roles),
        UseGuards(AuthGuard('jwt'), SameUserAuthGuard)

        // UseGuards(AuthGuard, RolesGuard),
        // ApiBearerAuth(),
        // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function Auth_SameIdOrAdmin() {

    return applyDecorators(
        // RoleProtect(...roles),
        UseGuards(AuthGuard('jwt'), SameUserOrAdminGuard)

        // UseGuards(AuthGuard, RolesGuard),
        // ApiBearerAuth(),
        // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

