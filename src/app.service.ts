import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Movie, Actor } from './entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: MongoRepository<Movie>,
    @InjectRepository(Actor) private actorsRepository: MongoRepository<Actor>
  ) { }

  async getMovie(): Promise<Movie> {
    return await this.moviesRepository.findOne();
  }

  async getActor(): Promise<Actor> {
    return await this.actorsRepository.findOne();
  }
}
