import { Role, Users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements Users {
  constructor(partial: Partial<UserEntity> | null) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  registeredAt: Date;
  @ApiProperty()
  updatedAt: Date;
  roles: Role[];
  @Exclude()
  password: string;
}
