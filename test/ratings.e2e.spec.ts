import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RatingsService } from '../src/ratings/ratings.service';
import { getMockRating, getMockUpdatedRating, MockRatingRepositoryProvider } from '../src/ratings/ratings.mock.spec';
import { RatingsController } from '../src/ratings/ratings.controller';

describe('Ratings endpoint', () => {
    let app: INestApplication;
    let client: request.SuperTest<request.Test>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [
                RatingsService,
                MockRatingRepositoryProvider
            ],
            controllers: [
                RatingsController
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        client = request(app.getHttpServer());
    });

    it('should retrieve and return a rating record on GET request', () => client
        .get('/ratings/tt0000005')
        .expect(200)
        .expect(getMockRating(true))
    );

    it('should update the average rating and return updated values on PUT request', () => client
        .put('/ratings/tt0000005')
        .send({ rating: 9 })
        .expect(200)
        .expect(getMockUpdatedRating(true))
    );
});
