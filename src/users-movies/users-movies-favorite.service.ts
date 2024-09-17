import { Injectable } from '@nestjs/common';
import { CreateUsersMovieFavoriteDto } from './dto/create-users-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersFavoriteMoviesService {
  constructor(private readonly prisma: PrismaService) {}
  addTo(id: string, createUsersMovieDto: CreateUsersMovieFavoriteDto) {
    return this.prisma.favoriteMovies.upsert({
      where: {
        movieId_userId: { userId: id, movieId: createUsersMovieDto.movieId },
      },
      update: {},
      create: { userId: id, movieId: createUsersMovieDto.movieId },
    });
  }

  findAll(id: string) {
    return this.prisma.favoriteMovies.findMany({ where: { userId: id } });
  }

  remove(userId: string, movieId: string) {
    return this.prisma.favoriteMovies.delete({
      where: { movieId_userId: { userId: userId, movieId: movieId } },
    });
  }
}
