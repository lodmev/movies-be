import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    // console.log(roles);
    if (!roles || roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => roles.some((role) => user?.roles.includes(role));
    // console.log(!user, !user?.roles, !hasRole());
    if (!user || !user?.roles || !hasRole()) {
      throw new ForbiddenException('User has no access to this resource');
    }
    return true;
  }
}
