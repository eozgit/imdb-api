import { Controller, Get, Body, Put, Param } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) { }

  @Get(':tconst')
  async findOne(@Param('tconst') tconst: string) {
    return await this.ratingsService.findOne(tconst);
  }

  @Put(':tconst')
  async update(@Param('tconst') tconst: string, @Body() updateRatingDto: UpdateRatingDto) {
    return await this.ratingsService.update(tconst, updateRatingDto);
  }
}
