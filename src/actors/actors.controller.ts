import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) { }

  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 0,
    @Query('name') name: string = '',
    @Query('birthYear') birthYear: number = 0
  ) {
    return this.actorsService.findAll(page, name, birthYear);
  }

  @Get(':nconst')
  findOne(@Param('nconst') nconst: string) {
    return this.actorsService.findOne(nconst);
  }

  @Put(':nconst')
  update(@Param('nconst') nconst: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(nconst, updateActorDto);
  }

  @Delete(':nconst')
  remove(@Param('nconst') nconst: string) {
    return this.actorsService.remove(nconst);
  }
}
