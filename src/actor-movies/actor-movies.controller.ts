import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ActorMoviesService } from './actor-movies.service';
import { CreateActorMovieDto } from './dto/create-actor-movie.dto';
import { UpdateActorMovieDto } from './dto/update-actor-movie.dto';

@Controller('actor-movies')
export class ActorMoviesController {
  constructor(private readonly actorMoviesService: ActorMoviesService) { }

  @Post()
  create(@Body() createActorMovieDto: CreateActorMovieDto) {
    return this.actorMoviesService.create(createActorMovieDto);
  }

  @Get()
  findOne(
    @Query('tconst') tconst: string,
    @Query('nconst') nconst: string
  ) {
    return this.actorMoviesService.findOne(tconst, nconst);
  }

  @Put()
  update(
    @Query('tconst') tconst: string,
    @Query('nconst') nconst: string,
    @Body() updateActorMovieDto: UpdateActorMovieDto
  ) {
    return this.actorMoviesService.update(tconst, nconst, updateActorMovieDto);
  }

  @Delete()
  remove(
    @Query('tconst') tconst: string,
    @Query('nconst') nconst: string
  ) {
    return this.actorMoviesService.remove(tconst, nconst);
  }
}
