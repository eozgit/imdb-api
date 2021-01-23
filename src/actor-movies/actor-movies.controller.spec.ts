import { Test, TestingModule } from '@nestjs/testing';
import { ActorMoviesController } from './actor-movies.controller';
import { ActorMoviesService } from './actor-movies.service';
import { getMockActorMovie, getMockUpdatedActorMovie, MockActorMovieRepositoryProvider } from './actor-movies.mock.spec';

describe('ActorMoviesController', () => {
  let controller: ActorMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorMoviesController],
      providers: [
        ActorMoviesService,
        MockActorMovieRepositoryProvider
      ],
    }).compile();

    controller = module.get<ActorMoviesController>(ActorMoviesController);
  });

  it('should insert and return the actor-movie record when create is called', async () => {
    const actorMovie = await controller.create(getMockActorMovie());

    expect(actorMovie).toEqual(getMockActorMovie());
  });

  it('should retrieve and return an actor-movie record when findOne is called', async () => {
    const actorMovie = await controller.findOne('tt0000003', 'nm0721526');

    expect(actorMovie).toEqual(getMockActorMovie());
  });

  it('should update the category and return updated values when update is called', async () => {
    const actorMovie = await controller.update('tt0000003', 'nm0721526', { category: 'actor' });

    expect(actorMovie).toEqual(getMockUpdatedActorMovie());
  });

  it('should remove the actor-movie record and return null when remove is called', async () => {
    const actorMovie = await controller.remove('tt0000003', 'nm0721526');

    expect(actorMovie).toEqual(undefined);
  });
});
