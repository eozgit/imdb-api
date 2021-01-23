import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getMockMovie, MockMovieRepositoryProvider } from '../src/movies/movies.mock.spec';
import { MoviesController } from '../src/movies/movies.controller';
import { MoviesService } from '../src/movies/movies.service';
import { MockActorRepositoryProvider } from '../src/actors/actors.service.spec';
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

    it('should insert and return the movie record on POST request', (done) => client
        .post('/movies')
        .send(getMockMovie())
        .expect(201)
        .expect(getMockMovie(true))
        .end(done)
    );

    it('should retrieve and return matching movie records on GET request', (done) => client
        .get('/movies?title=matrix&year=1999&genre=action')
        .expect(200)
        .expect([getMockMovie(true)])
        .end(done)
    );
});
