import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Actor, ActorMovie } from './entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Actor) private actorsRepository: MongoRepository<Actor>,
    @InjectRepository(ActorMovie) private actorsMoviesRepository: MongoRepository<ActorMovie>,
  ) { }

  async getActor(): Promise<Actor> {
    return await this.actorsRepository.findOne();
  }

  async getActorMovie(): Promise<ActorMovie> {
    return await this.actorsMoviesRepository.findOne();
  }
}
