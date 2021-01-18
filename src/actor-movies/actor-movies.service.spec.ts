import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ActorMoviesService } from './actor-movies.service';
import { ActorMovie } from './entities/actor-movie.entity';

export const getMockActorMovie = () => ({
  _id: new ObjectId("5ff8cada3e7c8db3c81744a7"),
  tconst: "tt0000004",
  ordering: 2,
  nconst: "nm1335271",
  category: "composer",
  job: "\\N",
  characters: "\\N"
});

export const getMockUpdatedActorMovie = () => ({
  _id: new ObjectId("5ff8cada3e7c8db3c81744a7"),
  tconst: "tt0000004",
  ordering: 2,
  nconst: "nm1335271",
  category: "director",
  job: "\\N",
  characters: "\\N"
});

export const MockActorMovieRepository = {
  insertOne: jest.fn(() => getMockActorMovie()),
  find: jest.fn(() => [getMockActorMovie()]),
  findOneOrFail: jest.fn(() => getMockActorMovie()),
  save: jest.fn(() => ([getMockUpdatedActorMovie()])),
  deleteOne: jest.fn(() => null)
};

describe('ActorMoviesService', () => {
  let service: ActorMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActorMoviesService,
        {
          provide: getRepositoryToken(ActorMovie),
          useValue: MockActorMovieRepository,
        }],
    }).compile();

    service = module.get<ActorMoviesService>(ActorMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
