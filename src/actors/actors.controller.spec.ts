import { Test, TestingModule } from '@nestjs/testing';
import { MockActorMovieRepositoryProvider } from '../actor-movies/actor-movies.service.spec';
import { MockMovieRepositoryProvider } from '../movies/movies.mock.spec';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { getMockActor, getMockUpdatedActor, MockActorRepositoryProvider } from './actors.mock.spec';

describe('ActorsController', () => {
  let controller: ActorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorsController],
      providers: [
        ActorsService,
        MockActorRepositoryProvider,
        MockActorMovieRepositoryProvider,
        MockMovieRepositoryProvider
      ],
    }).compile();

    controller = module.get<ActorsController>(ActorsController);
  });

  it('should insert and return the actor record when create is called', async () => {
    const actor = await controller.create(getMockActor());

    expect(actor).toEqual(getMockActor());
  });

  it('should retrieve and return matching actor records when findAll is called', async () => {
    const actor = await controller.findAll(0, 'Gary', 1901);

    expect(actor).toEqual([getMockActor()]);
  });

  it('should retrieve and return an actor record when findOne is called', async () => {
    const actor = await controller.findOne('nm0000011');

    expect(actor).toEqual(getMockActor());
  });

  it('should update the profession and return updated values when update is called', async () => {
    const actor = await controller.update('nm0000011', { primaryProfession: 'Actor' });

    expect(actor).toEqual(getMockUpdatedActor());
  });

  it('should remove the actor record and return null when remove is called', async () => {
    const actor = await controller.remove('nm0000011');

    expect(actor).toEqual(undefined);
  });
});
