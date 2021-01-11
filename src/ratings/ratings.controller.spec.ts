import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Rating } from './entities/rating.entity';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { MockRatingRepository } from './ratings.service.spec';

describe('RatingsController', () => {
  let controller: RatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [RatingsService,
        {
          provide: getRepositoryToken(Rating),
          useValue: MockRatingRepository,
        }],
    }).compile();

    controller = module.get<RatingsController>(RatingsController);
  });

  it('should retrieve and return a rating record when findOne is called', async () => {
    const rating = await controller.findOne('tt0000005');

    expect(rating).toEqual({
      _id: new ObjectId("5ff8c968ed3c3d8560f7b12c"),
      tconst: "tt0000005",
      averageRating: 6.2,
      numVotes: 2188
    });
  });

  it('should update the average rating and return updated values when update is called', async () => {
    const rating = await controller.update('tt0000005', { rating: 9 });

    expect(rating).toEqual({
      _id: new ObjectId("5ff8c968ed3c3d8560f7b12c"),
      tconst: "tt0000005",
      averageRating: 6.3,
      numVotes: 2189
    });
  });
});
