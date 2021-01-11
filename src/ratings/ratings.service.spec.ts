import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';

export const getMockRating = () => ({
  _id: new ObjectId("5ff8c968ed3c3d8560f7b12c"),
  tconst: "tt0000005",
  averageRating: 6.2,
  numVotes: 2188
});

export const getMockUpdatedRating = () => ({
  _id: new ObjectId("5ff8c968ed3c3d8560f7b12c"),
  tconst: "tt0000005",
  averageRating: 6.3,
  numVotes: 2189
});

export const MockRatingRepository = {
  findOne: jest.fn(() => getMockRating()),
  save: jest.fn(() => ([getMockUpdatedRating()]))
};

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingsService,
        {
          provide: getRepositoryToken(Rating),
          useValue: MockRatingRepository,
        }],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('should retrieve and return a rating record when findOne is called', async () => {
    const rating = await service.findOne('tt0000005');

    expect(rating).toEqual(getMockRating());
  });

  it('should update the average rating and return updated values when update is called', async () => {
    const rating = await service.update('tt0000005', { rating: 9 });

    expect(rating).toEqual(getMockUpdatedRating());
  });
});
