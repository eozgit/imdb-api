import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Movie, Actor, ActorMovie, Rating } from './entity';
import { RatingsModule } from './ratings/ratings.module';

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
    TypeOrmModule.forFeature([Movie, Actor, ActorMovie, Rating]),
    RatingsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
