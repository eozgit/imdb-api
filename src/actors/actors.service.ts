import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MongoRepository } from 'typeorm';
import { v4 } from 'uuid';
import { ActorMovie } from '../actor-movies/entities/actor-movie.entity';
import { Movie } from '../movies/entities/movie.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: MongoRepository<Movie>,
    @InjectRepository(Actor) private actorsRepository: MongoRepository<Actor>,
    @InjectRepository(ActorMovie) private actorsMoviesRepository: MongoRepository<ActorMovie>
  ) { }

  create(createActorDto: CreateActorDto) {
    createActorDto.nconst = v4();
    return this.actorsRepository.insertOne(createActorDto);
  }

  findAll(page: number, name: string, birthYear: number) {
    const take = 10;

    const options: FindManyOptions<Actor> = {
      skip: page * take,
      take
    };

    const where: any = {}

    if (name) {
      where.primaryName = {
        $regex: new RegExp(`.*${name}.*`, 'i')
      };
    }

    if (birthYear) {
      where.birthYear = {
        $eq: Number(birthYear)
      };
    }

    options.where = where;

    return this.actorsRepository.find(options);
  }

  async findOne(nconst: string, includeMovies = false) {
    const actor = this.actorsRepository.findOneOrFail({ nconst });

    if (includeMovies) {
      const actorMovies = await this.actorsMoviesRepository.find({ nconst });

      const movies = await this.moviesRepository.find({
        where: {
          tconst: {
            $in: actorMovies.map(r => r.tconst)
          }
        }
      });

      (actor as any).movies = movies;
    }

    return actor;
  }

  async update(nconst: string, updateActorDto: UpdateActorDto) {
    const record = await this.findOne(nconst);
    Object.entries(updateActorDto).forEach(([key, value]) => {
      record[key] = value;
    });
    const records = await this.actorsRepository.save([record]);
    return records[0];
  }

  remove(nconst: string) {
    this.actorsRepository.deleteOne({ nconst });
  }
}
