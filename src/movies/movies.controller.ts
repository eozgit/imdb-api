import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 0,
    @Query('title') title: string = '',
    @Query('year') year: number = 0,
    @Query('genre') genre: string = ''
  ) {
    return this.moviesService.findAll(page, title, year, genre);
  }

  @Get(':tconst')
  findOne(
    @Param('tconst') tconst: string,
    @Query('includeActors') includeActors: boolean = false
  ) {
    return this.moviesService.findOne(tconst, includeActors);
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
