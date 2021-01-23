import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getMockMovie, getMockUpdatedMovie, MockMovieRepositoryProvider } from '../src/movies/movies.mock.spec';
import { MoviesController } from '../src/movies/movies.controller';
import { MoviesService } from '../src/movies/movies.service';
import { MockActorRepositoryProvider } from '../src/actors/actors.mock.spec';
import { MockActorMovieRepositoryProvider } from '../src/actor-movies/actor-movies.service.spec';

describe('Movies endpoint', () => {
    let app: INestApplication;
    let client: request.SuperTest<request.Test>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [
                MoviesService,
                MockMovieRepositoryProvider,
                MockActorRepositoryProvider,
                MockActorMovieRepositoryProvider
            ],
            controllers: [
                MoviesController
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        client = request(app.getHttpServer());
    });

    it('should insert and return the movie record on POST request', () => client
        .post('/movies')
        .send(getMockMovie())
        .expect(201)
        .expect(getMockMovie(true))
    );

    it('should retrieve and return matching movie records on GET request', () => client
        .get('/movies?title=matrix&year=1999&genre=action')
        .expect(200)
        .expect([getMockMovie(true)])
    );

    describe('with an id parameter', () => {
        it('should retrieve and return a movie record on GET request', () => client
            .get('/movies/tt0000007')
            .expect(200)
            .expect(getMockMovie(true))
        );

        it('should update the runtime and return updated values on PUT request', () => client
            .put('/movies/tt0000007')
            .send({ runtimeMinutes: 2 })
            .expect(200)
            .expect(getMockUpdatedMovie(true))
        );

        it('should remove the movie record on DELETE request', () => client
            .delete('/movies/tt0000007')
            .expect(200)
        );
    });
});
