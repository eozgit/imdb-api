import { Test, TestingModule } from '@nestjs/testing';
import { ActorMoviesController } from './actor-movies.controller';
import { ActorMoviesService } from './actor-movies.service';

describe('ActorMoviesController', () => {
  let controller: ActorMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorMoviesController],
      providers: [ActorMoviesService],
    }).compile();

    controller = module.get<ActorMoviesController>(ActorMoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
