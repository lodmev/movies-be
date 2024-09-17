import { Module } from '@nestjs/common';
import { UsersFavoriteMoviesService } from './users-movies-favorite.service';
import { UsersMoviesFavoriteController } from './users-movies-favorite.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UsersMoviesFavoriteController],
  providers: [UsersFavoriteMoviesService],
  imports: [PrismaModule],
})
export class UsersMoviesModule {}
