import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { Actor } from './entities/actor.entity';
import { ActorMovie } from '../actor-movies/entities/actor-movie.entity';
import { Movie } from '../movies/entities/movie.entity';

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
  imports: [
    TypeOrmModule.forFeature([Actor, ActorMovie, Movie]),
  ]
})
export class ActorsModule {}
