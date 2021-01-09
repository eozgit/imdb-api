import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Movie, Actor, ActorMovie } from './entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "imdb",
      synchronize: false,
      logging: false,
      entities: [Movie, Actor, ActorMovie],
    }),
    TypeOrmModule.forFeature([Movie, Actor, ActorMovie])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
