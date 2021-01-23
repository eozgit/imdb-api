import { Test, TestingModule } from '@nestjs/testing';
import { MockActorMovieRepositoryProvider } from '../actor-movies/actor-movies.service.spec';
import { MockActorRepositoryProvider } from '../actors/actors.service.spec';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { getMockMovie, getMockUpdatedMovie, MockMovieRepositoryProvider } from './movies.mock.spec';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        MockMovieRepositoryProvider,
        MockActorRepositoryProvider,
        MockActorMovieRepositoryProvider
      ]
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should insert and return the movie record when create is called', async () => {
    const movie = await controller.create(getMockMovie());

    expect(movie).toEqual(getMockMovie());
  });

  it('should retrieve and return matching movie records when findAll is called', async () => {
    const movie = await controller.findAll(0, 'Matrix', 1999, 'Action');

    expect(movie).toEqual([getMockMovie()]);
  });

  it('should retrieve and return a movie record when findOne is called', async () => {
    const movie = await controller.findOne('tt0000007');

    expect(movie).toEqual(getMockMovie());
  });

  it('should update the runtime and return updated values when update is called', async () => {
    const movie = await controller.update('tt0000007', { runtimeMinutes: 2 });

    expect(movie).toEqual(getMockUpdatedMovie());
  });

  it('should remove the movie record and return null when remove is called', async () => {
    const movie = await controller.remove('tt0000007');

    expect(movie).toEqual(undefined);
  });
});
