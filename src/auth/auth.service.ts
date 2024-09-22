import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const error = new UnauthorizedException(
      'No users with such email or password',
    );
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw error;
    }
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
