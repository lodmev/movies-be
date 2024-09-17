import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { contains } from 'class-validator';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMovieDto: CreateMovieDto) {
    return this.prisma.movies.create({ data: createMovieDto });
  }

  findAll() {
    return this.prisma.movies.findMany();
  }

  async findByFilter(query: Record<string, string>) {
    const qName = query?.name;
    if (!qName) {
      return [];
    }
    const request = { where: {} };
    if (qName) {
      request.where['name'] = {
        contains: qName,
        mode: 'insensitive',
      };
    }

    return this.prisma.movies.findMany(request);
  }

  findOne(id: string) {
    return this.prisma.movies.findUnique({ where: { id } });
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.prisma.movies.update({ where: { id }, data: updateMovieDto });
  }

  remove(id: string) {
    return this.prisma.movies.delete({ where: { id } });
  }
}
