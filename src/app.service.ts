import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Movie, Actor, ActorMovie, Rating } from './entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: MongoRepository<Movie>,
    @InjectRepository(Actor) private actorsRepository: MongoRepository<Actor>,
    @InjectRepository(ActorMovie) private actorsMoviesRepository: MongoRepository<ActorMovie>,
    @InjectRepository(Rating) private ratingsRepository: MongoRepository<Rating>
  ) { }

  async getMovie(): Promise<Movie> {
    return await this.moviesRepository.findOne();
  }

  async getActor(): Promise<Actor> {
    return await this.actorsRepository.findOne();
  }

  async getActorMovie(): Promise<ActorMovie> {
    return await this.actorsMoviesRepository.findOne();
  }

  async getRating(): Promise<Rating> {
    return await this.ratingsRepository.findOne();
  }
}
