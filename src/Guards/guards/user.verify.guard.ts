/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

import { ROLES_KEY } from '../decorators/verify.user.decorator';
import { AdminRoleService } from 'src/admin/role/role.service';
// import { User } from 'src/schema/auth.shcema';
// import { Model } from 'mongoose';

@Injectable()
export class VerifyUser implements CanActivate {
    constructor(
        private reflactor: Reflector,
        private readonly RoleService: AdminRoleService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRole = this.reflactor.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRole) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('user verify user: ', user);
        const userRole = await this.RoleService.getRole(user.roleId);

        return matchRoles(requiredRole, userRole.name);
    }
}

function matchRoles(requiredRole: string[], userRole: string) {
    return requiredRole.some((role: string) => userRole?.includes(role));
}
