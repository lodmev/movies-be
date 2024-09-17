import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '@prisma/client';

export const UserData = createParamDecorator(
  (data: keyof Users, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
