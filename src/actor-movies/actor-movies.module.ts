import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorMoviesService } from './actor-movies.service';
import { ActorMoviesController } from './actor-movies.controller';
import { ActorMovie } from './entities/actor-movie.entity';

@Module({
  controllers: [ActorMoviesController],
  providers: [ActorMoviesService],
  imports: [
    TypeOrmModule.forFeature([ActorMovie]),
  ]
})
export class ActorMoviesModule {}
