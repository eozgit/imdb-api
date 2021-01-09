import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Movie } from './entity/movie';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: MongoRepository<Movie>,
  ) { }

  async getHello(): Promise<Movie> {
    return  await this.moviesRepository.findOne();
  }
}
