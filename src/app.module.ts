import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Actor, ActorMovie } from './entity';
import { Rating } from './ratings/entities/rating.entity';
import { RatingsModule } from './ratings/ratings.module';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/entities/movie.entity';

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
    TypeOrmModule.forFeature([Actor, ActorMovie]),
    RatingsModule,
    MoviesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
