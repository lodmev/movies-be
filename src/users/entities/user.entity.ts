import { Role, Users, FavoriteMovies } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements Users {
  constructor(partial: Partial<UserEntity>) {
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
  @ApiProperty()
  token?: string;
  @ApiProperty()
  favoriteMovies: Pick<FavoriteMovies, 'movieId'>[];
  @Exclude()
  password: string;
}
