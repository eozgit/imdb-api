
import { getRepositoryToken } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { ObjectId } from 'mongodb';
import { ActorMovie } from './entities/actor-movie.entity';

const mockActorMovie = {
    _id: '5ff8cada3e7c8db3c81744a7',
    tconst: 'tt0000004',
    ordering: 2,
    nconst: 'nm1335271',
    category: 'composer',
    job: '\\N',
    characters: '\\N'
};

export const getMockActorMovie = (e2e: boolean = false) => {
    const actorMovie = cloneDeep(mockActorMovie);

    if (!e2e) {
        actorMovie._id = new ObjectId(actorMovie._id);
    }

    return actorMovie;
};

export const getMockUpdatedActorMovie = (e2e: boolean = false) => {
    const actorMovie = {
        ...cloneDeep(mockActorMovie),
        category: 'director'
    };

    if (!e2e) {
        actorMovie._id = new ObjectId(actorMovie._id);
    }

    return actorMovie;
};

export const MockActorMovieRepository = {
    insertOne: jest.fn(() => getMockActorMovie()),
    find: jest.fn(() => [getMockActorMovie()]),
    findOneOrFail: jest.fn(() => getMockActorMovie()),
    save: jest.fn(() => ([getMockUpdatedActorMovie()])),
    deleteOne: jest.fn(() => null)
};

export const MockActorMovieRepositoryProvider = {
    provide: getRepositoryToken(ActorMovie),
    useValue: MockActorMovieRepository,
};

describe('Movies mocks', () => {
    it('should provide a mock movie', () => {
        expect(getMockActorMovie(true)).toEqual(mockActorMovie);
    });
});
