import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersFavoriteMoviesService } from './users-movies-favorite.service';
import { CreateUsersMovieFavoriteDto } from './dto/create-users-movie.dto';
import { Auth } from 'src/auth/auth.decorator';
import { UserData } from '../users/users-data.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('users/movies/favorite')
@ApiTags('Users favorite movies')
export class UsersMoviesFavoriteController {
  constructor(
    private readonly usersMoviesService: UsersFavoriteMoviesService,
  ) {}

  @Post()
  @Auth()
  add(
    @UserData('id') id: string,
    @Body() createUsersMovieDto: CreateUsersMovieFavoriteDto,
  ) {
    return this.usersMoviesService.addTo(id, createUsersMovieDto);
  }

  @Get()
  @Auth()
  findAll(@UserData('id') id: string) {
    return this.usersMoviesService.findAll(id);
  }

  @Delete(':movieId')
  @Auth()
  remove(@UserData('id') id: string, @Param('movieId') movieId: string) {
    return this.usersMoviesService.remove(id, movieId);
  }
}
