import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersMovieFavoriteDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  movieId: string;
}
