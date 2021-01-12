import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: MongoRepository<Movie>
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    return await this.moviesRepository.insert(createMovieDto);
  }

  async findAll() {
    return await this.moviesRepository.find();
  }

  async findOne(tconst: string) {
    const record = await this.moviesRepository.findOne({ tconst });
    if (!record) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return record;
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
    return await this.moviesRepository.deleteOne({ tconst });
  }
}
