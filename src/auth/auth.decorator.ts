import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from './jwt-auth-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from './roles-guard';

export const Auth = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
