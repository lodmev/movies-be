import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { FavoriteMovies, Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const plainPassword = createUserDto.password;
    const hashPassword = await bcrypt.hash(
      plainPassword,
      Number(this.config.get('ROUND_OF_HASHING')),
    );
    createUserDto.password = hashPassword;
    const newUser: Users & {
      token?: string;
      favoriteMovies?: FavoriteMovies[];
    } = await this.prisma.users.create({ data: createUserDto });
    const { accessToken } = await this.authService.login(
      createUserDto.email,
      plainPassword,
    );
    newUser.token = accessToken;
    newUser.favoriteMovies = [];
    return newUser;
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        favoriteMovies: {
          select: { movieId: true },
        },
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string) {
    return this.prisma.users.delete({ where: { id } });
  }
}
