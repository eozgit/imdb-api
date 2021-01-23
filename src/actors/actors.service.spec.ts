import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MockActorMovieRepositoryProvider } from '../actor-movies/actor-movies.service.spec';
import { MockMovieRepositoryProvider } from '../movies/movies.mock.spec';
import { ActorsService } from './actors.service';
import { Actor } from './entities/actor.entity';

export const getMockActor = () => ({
  _id: new ObjectId("5ff8cdd7e65563629d215c65"),
  nconst: "nm0000011",
  primaryName: "Gary Cooper",
  birthYear: 1901,
  deathYear: 1961,
  primaryProfession: "actor,soundtrack,producer",
  knownForTitles: "tt0027996,tt0035896,tt0044706,tt0034167"
});

export const getMockUpdatedActor = () => ({
  _id: new ObjectId("5ff8cdd7e65563629d215c65"),
  nconst: "nm0000011",
  primaryName: "Gary Cooper",
  birthYear: 1901,
  deathYear: 1961,
  primaryProfession: "actor",
  knownForTitles: "tt0027996,tt0035896,tt0044706,tt0034167"
});

export const MockActorRepository = {
  insertOne: jest.fn(() => getMockActor()),
  find: jest.fn(() => [getMockActor()]),
  findOneOrFail: jest.fn(() => getMockActor()),
  save: jest.fn(() => ([getMockUpdatedActor()])),
  deleteOne: jest.fn(() => null)
};

export const MockActorRepositoryProvider = {
  provide: getRepositoryToken(Actor),
  useValue: MockActorRepository,
};

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
