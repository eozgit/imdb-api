import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':tconst')
  findOne(@Param('tconst') tconst: string) {
    return this.moviesService.findOne(tconst);
  }

  @Put(':tconst')
  update(@Param('tconst') tconst: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(tconst, updateMovieDto);
  }

  @Delete(':tconst')
  remove(@Param('tconst') tconst: string) {
    return this.moviesService.remove(tconst);
  }
}
