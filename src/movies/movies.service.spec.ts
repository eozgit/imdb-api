import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

export const getMockMovie = () => ({
  _id: new ObjectId('5ff8ca0d500da388352dfc99'),
  tconst: 'tt0000007',
  titleType: 'short',
  primaryTitle: 'Corbett and Courtney Before the Kinetograph',
  originalTitle: 'Corbett and Courtney Before the Kinetograph',
  isAdult: 0,
  startYear: 1894,
  endYear: '\\N',
  runtimeMinutes: 1,
  genres: 'Short,Sport'
});

export const getMockUpdatedMovie = () => ({
  _id: new ObjectId('5ff8ca0d500da388352dfc99'),
  tconst: 'tt0000007',
  titleType: 'short',
  primaryTitle: 'Corbett and Courtney Before the Kinetograph',
  originalTitle: 'Corbett and Courtney Before the Kinetograph',
  isAdult: 0,
  startYear: 1894,
  endYear: '\\N',
  runtimeMinutes: 2,
  genres: 'Short,Sport'
});

export const MockMovieRepository = {
  insertOne: jest.fn(() => getMockMovie()),
  find: jest.fn(() => [getMockMovie()]),
  findOneOrFail: jest.fn(() => getMockMovie()),
  save: jest.fn(() => ([getMockUpdatedMovie()])),
  deleteOne: jest.fn(() => null)
};

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: MockMovieRepository,
        }],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should insert and return the movie when create is called', async () => {
    const movie = await service.create(getMockMovie());

    expect(movie).toEqual(getMockMovie());
  });

  it('should retrieve and return matching movie records when findAll is called', async () => {
    const movie = await service.findAll(0, 'Matrix', 1999, 'Action');

    expect(movie).toEqual([getMockMovie()]);
  });

  it('should retrieve and return a movie record when findOne is called', async () => {
    const movie = await service.findOne('tt0000007');

    expect(movie).toEqual(getMockMovie());
  });

  it('should update the runtime and return updated values when update is called', async () => {
    const movie = await service.update('tt0000007', { runtimeMinutes: 2 });

    expect(movie).toEqual(getMockUpdatedMovie());
  });

  it('should remove the movie record and return null when remove is called', async () => {
    const movie = await service.remove('tt0000007');

    expect(movie).toEqual(undefined);
  });
});
