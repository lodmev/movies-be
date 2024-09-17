import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersMoviesModule } from './users-movies/users-movies.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersMoviesModule,
    UsersModule,
    MoviesModule,
    AuthModule,
  ],
})
export class AppModule {}
