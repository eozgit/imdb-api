import { Test, TestingModule } from '@nestjs/testing';
import { getMockActorMovie, getMockUpdatedActorMovie, MockActorMovieRepositoryProvider } from './actor-movies.mock.spec';
import { ActorMoviesService } from './actor-movies.service';

describe('ActorMoviesService', () => {
  let service: ActorMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorMoviesService,
        MockActorMovieRepositoryProvider
      ],
    }).compile();

    service = module.get<ActorMoviesService>(ActorMoviesService);
  });

  it('should insert and return the actor-movie record when create is called', async () => {
    const actorMovie = await service.create(getMockActorMovie());

    expect(actorMovie).toEqual(getMockActorMovie());
  });

  it('should retrieve and return an actor-movie record when findOne is called', async () => {
    const actorMovie = await service.findOne('tt0000003', 'nm0721526');

    expect(actorMovie).toEqual(getMockActorMovie());
  });

  it('should update the category and return updated values when update is called', async () => {
    const actorMovie = await service.update('tt0000003', 'nm0721526', { category: 'actor' });

    expect(actorMovie).toEqual(getMockUpdatedActorMovie());
  });

  it('should remove the actor-movie record and return null when remove is called', async () => {
    const actorMovie = await service.remove('tt0000003', 'nm0721526');

    expect(actorMovie).toEqual(undefined);
  });
});
