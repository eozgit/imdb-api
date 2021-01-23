import { Test, TestingModule } from '@nestjs/testing';
import { MockActorMovieRepositoryProvider } from '../actor-movies/actor-movies.mock.spec';
import { MockActorRepositoryProvider } from '../actors/actors.mock.spec';
import { getMockMovie, getMockUpdatedMovie, MockMovieRepositoryProvider } from './movies.mock.spec';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        MockMovieRepositoryProvider,
        MockActorRepositoryProvider,
        MockActorMovieRepositoryProvider
      ]
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should insert and return the movie record when create is called', async () => {
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
