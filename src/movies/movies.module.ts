import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { Actor } from '../actors/entities/actor.entity';
import { ActorMovie } from '../actor-movies/entities/actor-movie.entity';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    TypeOrmModule.forFeature([Movie, Actor, ActorMovie]),
  ]
})
export class MoviesModule {}
