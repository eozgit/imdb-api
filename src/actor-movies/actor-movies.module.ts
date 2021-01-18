import { Module } from '@nestjs/common';
import { ActorMoviesService } from './actor-movies.service';
import { ActorMoviesController } from './actor-movies.controller';

@Module({
  controllers: [ActorMoviesController],
  providers: [ActorMoviesService]
})
export class ActorMoviesModule {}
