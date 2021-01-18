import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActorMoviesController } from './actor-movies.controller';
import { ActorMoviesService } from './actor-movies.service';
import { MockActorMovieRepository } from './actor-movies.service.spec';
import { ActorMovie } from './entities/actor-movie.entity';

describe('ActorMoviesController', () => {
  let controller: ActorMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorMoviesController],
      providers: [ActorMoviesService,
        {
          provide: getRepositoryToken(ActorMovie),
          useValue: MockActorMovieRepository,
        }],
    }).compile();

    controller = module.get<ActorMoviesController>(ActorMoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
