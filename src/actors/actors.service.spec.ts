import { Test, TestingModule } from '@nestjs/testing';
import { MockActorMovieRepositoryProvider } from '../actor-movies/actor-movies.mock.spec';
import { MockMovieRepositoryProvider } from '../movies/movies.mock.spec';
import { getMockActor, getMockUpdatedActor, MockActorRepositoryProvider } from './actors.mock.spec';
import { ActorsService } from './actors.service';

describe('ActorsService', () => {
  let service: ActorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorsService,
        MockActorRepositoryProvider,
        MockActorMovieRepositoryProvider,
        MockMovieRepositoryProvider
      ],
    }).compile();

    service = module.get<ActorsService>(ActorsService);
  });

  it('should insert and return the actor record when create is called', async () => {
    const actor = await service.create(getMockActor());

    expect(actor).toEqual(getMockActor());
  });

  it('should retrieve and return matching actor records when findAll is called', async () => {
    const actor = await service.findAll(0, 'Gary', 1901);

    expect(actor).toEqual([getMockActor()]);
  });

  it('should retrieve and return an actor record when findOne is called', async () => {
    const actor = await service.findOne('nm0000011');

    expect(actor).toEqual(getMockActor());
  });

  it('should update the profession and return updated values when update is called', async () => {
    const actor = await service.update('nm0000011', { primaryProfession: 'Actor' });

    expect(actor).toEqual(getMockUpdatedActor());
  });

  it('should remove the actor record and return null when remove is called', async () => {
    const actor = await service.remove('nm0000011');

    expect(actor).toEqual(undefined);
  });
});
