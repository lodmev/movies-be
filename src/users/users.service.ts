import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      this.config.get('ROUND_OF_HASHING'),
    );
    return this.prisma.users.create({ data: createUserDto });
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
