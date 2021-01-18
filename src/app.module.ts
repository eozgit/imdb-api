import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RatingsModule } from './ratings/ratings.module';
import { Rating } from './ratings/entities/rating.entity';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/entities/movie.entity';
import { ActorsModule } from './actors/actors.module';
import { Actor } from './actors/entities/actor.entity';
import { ActorMoviesModule } from './actor-movies/actor-movies.module';
import { ActorMovie } from './actor-movies/entities/actor-movie.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "imdb",
      synchronize: false,
      logging: false,
      entities: [Movie, Actor, ActorMovie, Rating],
      useUnifiedTopology: true
    }),
    RatingsModule,
    MoviesModule,
    ActorsModule,
    ActorMoviesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
