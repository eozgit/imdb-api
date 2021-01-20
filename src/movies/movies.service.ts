import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MongoRepository } from 'typeorm';
import { v4 } from 'uuid';
import { ActorMovie } from '../actor-movies/entities/actor-movie.entity';
import { Actor } from '../actors/entities/actor.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: MongoRepository<Movie>,
    @InjectRepository(Actor) private actorsRepository: MongoRepository<Actor>,
    @InjectRepository(ActorMovie) private actorsMoviesRepository: MongoRepository<ActorMovie>
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    createMovieDto.tconst = v4();
    return await this.moviesRepository.insertOne(createMovieDto);
  }

  async findAll(page: number, title: string, year: number, genre: string) {
    const take = 10;

    const options: FindManyOptions<Movie> = {
      skip: page * take,
      take
    };

    const where: any = {}

    if (title) {
      where.primaryTitle = {
        $regex: new RegExp(`.*${title}.*`, 'i')
      };
    }

    if (genre) {
      where.genres = {
        $regex: new RegExp(`.*${genre}.*`, 'i')
      };
    }

    if (year) {
      where.startYear = {
        $eq: Number(year)
      };
    }

    options.where = where;

    return await this.moviesRepository.find(options);
  }

  async findOne(tconst: string, includeActors: boolean = false) {
    const movie = await this.moviesRepository.findOneOrFail({ tconst });

    if (includeActors) {
      const actorMovies = await this.actorsMoviesRepository.find({ tconst });

      const actors = await this.actorsRepository.find({
        where: {
          nconst: {
            $in: actorMovies.map(r => r.nconst)
          }
        }
      });

      (movie as any).actors = actors;
    }

    return movie;
  }

  async update(tconst: string, updateMovieDto: UpdateMovieDto) {
    const record = await this.findOne(tconst);
    Object.entries(updateMovieDto).forEach(([key, value]) => {
      record[key] = value;
    });
    const records = await this.moviesRepository.save([record]);
    return records[0];
  }

  async remove(tconst: string) {
    await this.moviesRepository.deleteOne({ tconst });
  }
}
