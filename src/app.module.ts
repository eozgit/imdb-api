import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorMovie } from './entity';
import { RatingsModule } from './ratings/ratings.module';
import { Rating } from './ratings/entities/rating.entity';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/entities/movie.entity';
import { ActorsModule } from './actors/actors.module';
import { Actor } from './actors/entities/actor.entity';

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
    TypeOrmModule.forFeature([ActorMovie]),
    RatingsModule,
    MoviesModule,
    ActorsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
