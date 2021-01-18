import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ActorMoviesService } from './actor-movies.service';
import { CreateActorMovieDto } from './dto/create-actor-movie.dto';
import { UpdateActorMovieDto } from './dto/update-actor-movie.dto';

@Controller('actor-movies')
export class ActorMoviesController {
  constructor(private readonly actorMoviesService: ActorMoviesService) {}

  @Post()
  create(@Body() createActorMovieDto: CreateActorMovieDto) {
    return this.actorMoviesService.create(createActorMovieDto);
  }

  @Get()
  findAll() {
    return this.actorMoviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorMoviesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActorMovieDto: UpdateActorMovieDto) {
    return this.actorMoviesService.update(+id, updateActorMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorMoviesService.remove(+id);
  }
}
