import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { cloneDeep } from 'lodash';
import { Movie } from './entities/movie.entity';

const mockMovie = {
    _id: '5ff8ca0d500da388352dfc99',
    tconst: 'tt0000007',
    titleType: 'short',
    primaryTitle: 'Corbett and Courtney Before the Kinetograph',
    originalTitle: 'Corbett and Courtney Before the Kinetograph',
    isAdult: 0,
    startYear: 1894,
    endYear: '\\N',
    runtimeMinutes: 1,
    genres: 'Short,Sport'
};

export const getMockMovie = (e2e: boolean = false) => {
    const movie = cloneDeep(mockMovie);

    if (!e2e) {
        movie._id = new ObjectId(movie._id);
    }

    return movie;
};

export const getMockUpdatedMovie = (e2e: boolean = false) => {
    const movie = {
        ...cloneDeep(mockMovie),
        runtimeMinutes: 2
    };

    if (!e2e) {
        movie._id = new ObjectId(movie._id);
    }

    return movie;
};

export const MockMovieRepository = {
    insertOne: jest.fn(() => getMockMovie()),
    find: jest.fn(() => [getMockMovie()]),
    findOneOrFail: jest.fn(() => getMockMovie()),
    save: jest.fn(() => ([getMockUpdatedMovie()])),
    deleteOne: jest.fn(() => null)
};

export const MockMovieRepositoryProvider = {
    provide: getRepositoryToken(Movie),
    useValue: MockMovieRepository,
};

describe('Movies mocks', () => {
    it('should provide a mock movie', () => {
        expect(getMockMovie(true)).toEqual(mockMovie);
    });
});
