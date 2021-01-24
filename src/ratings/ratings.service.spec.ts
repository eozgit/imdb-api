import { Test, TestingModule } from '@nestjs/testing';
import { getMockRating, getMockUpdatedRating, MockRatingRepositoryProvider } from './ratings.mock.spec';
import { RatingsService } from './ratings.service';

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        MockRatingRepositoryProvider
      ],
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
