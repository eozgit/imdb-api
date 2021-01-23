import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getMockActorMovie, getMockUpdatedActorMovie, MockActorMovieRepositoryProvider } from '../src/actor-movies/actor-movies.mock.spec';
import { ActorMoviesController } from '../src/actor-movies/actor-movies.controller';
import { ActorMoviesService } from '../src/actor-movies/actor-movies.service';

describe('Actor-Movies endpoint', () => {
    let app: INestApplication;
    let client: request.SuperTest<request.Test>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [
                ActorMoviesService,
                MockActorMovieRepositoryProvider
            ],
            controllers: [
                ActorMoviesController
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        client = request(app.getHttpServer());
    });

    it('should insert and return the actor-movie record on POST request', () => client
        .post('/actor-movies')
        .send(getMockActorMovie())
        .expect(201)
        .expect(getMockActorMovie(true))
    );

    describe('with query parameters', () => {
        it('should retrieve and return an actor-movie record on GET request', () => client
            .get('/actor-movies?tconst=tt0000003&nconst=nm0721526')
            .expect(200)
            .expect(getMockActorMovie(true))
        );

        it('should update the category and return updated values on PUT request', () => client
            .put('/actor-movies?tconst=tt0000003&nconst=nm0721526')
            .send({ category: 'Actor' })
            .expect(200)
            .expect(getMockUpdatedActorMovie(true))
        );

        it('should remove the actor-movie record on DELETE request', () => client
            .delete('/actor-movies?tconst=tt0000003&nconst=nm0721526')
            .expect(200)
        );
    });
});
