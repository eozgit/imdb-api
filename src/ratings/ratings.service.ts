import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingsRepository: MongoRepository<Rating>
  ) { }

  async findOne(tconst: string) {
    const record = await this.ratingsRepository.findOne({ tconst });
    if (!record) {
      throw new HttpException('Rating not found', HttpStatus.NOT_FOUND);
    }
    return record;
  }

  async update(tconst: string, updateRatingDto: UpdateRatingDto) {
    const record = await this.findOne(tconst);
    const { averageRating, numVotes } = record;
    record.averageRating = (averageRating * numVotes + updateRatingDto.rating) / (numVotes + 1);
    record.numVotes++;
    const records = await this.ratingsRepository.save([record]);
    return records[0];
  }
}
