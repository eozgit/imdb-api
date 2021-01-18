import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateActorMovieDto } from './dto/create-actor-movie.dto';
import { UpdateActorMovieDto } from './dto/update-actor-movie.dto';
import { ActorMovie } from './entities/actor-movie.entity';

@Injectable()
export class ActorMoviesService {
  constructor(
    @InjectRepository(ActorMovie) private actorsMoviesRepository: MongoRepository<ActorMovie>
  ) { }

  create(createActorMovieDto: CreateActorMovieDto) {
    createActorMovieDto.nconst = v4();
    createActorMovieDto.tconst = v4();
    return this.actorsMoviesRepository.insertOne(createActorMovieDto);
  }

  findOne(tconst: string, nconst: string) {
    return this.actorsMoviesRepository.findOneOrFail({ tconst, nconst });
  }

  async update(tconst: string, nconst: string, updateActorMovieDto: UpdateActorMovieDto) {
    const record = await this.findOne(tconst, nconst);
    Object.entries(updateActorMovieDto).forEach(([key, value]) => {
      record[key] = value;
    });
    const records = await this.actorsMoviesRepository.save([record]);
    return records[0];
  }

  remove(tconst: string, nconst: string) {
    this.actorsMoviesRepository.deleteOne({ tconst, nconst });
  }
}
