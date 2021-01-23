import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MockMovieRepositoryProvider } from '../src/movies/movies.mock.spec';
import { getMockActor, getMockUpdatedActor, MockActorRepositoryProvider } from '../src/actors/actors.mock.spec';
import { MockActorMovieRepositoryProvider } from '../src/actor-movies/actor-movies.mock.spec';
import { ActorsService } from '../src/actors/actors.service';
import { ActorsController } from '../src/actors/actors.controller';

describe('Actors endpoint', () => {
    let app: INestApplication;
    let client: request.SuperTest<request.Test>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [
                ActorsService,
                MockMovieRepositoryProvider,
                MockActorRepositoryProvider,
                MockActorMovieRepositoryProvider
            ],
            controllers: [
                ActorsController
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        client = request(app.getHttpServer());
    });

    it('should insert and return the actor record on POST request', () => client
        .post('/actors')
        .send(getMockActor())
        .expect(201)
        .expect(getMockActor(true))
    );

    it('should retrieve and return matching actor records on GET request', () => client
        .get('/actors?name=Gary&birthYear=1901')
        .expect(200)
        .expect([getMockActor(true)])
    );

    describe('with an id parameter', () => {
        it('should retrieve and return an actor record on GET request', () => client
            .get('/actors/nm0000011')
            .expect(200)
            .expect(getMockActor(true))
        );

        it('should update the profession and return updated values on PUT request', () => client
            .put('/actors/nm0000011')
            .send({ primaryProfession: 'Actor' })
            .expect(200)
            .expect(getMockUpdatedActor(true))
        );

        it('should remove the actor record on DELETE request', () => client
            .delete('/actors/nm0000011')
            .expect(200)
        );
    });
});
