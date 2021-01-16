import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ActorMovie } from './entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ActorMovie) private actorsMoviesRepository: MongoRepository<ActorMovie>,
  ) { }

  async getActorMovie(): Promise<ActorMovie> {
    return await this.actorsMoviesRepository.findOne();
  }
}
