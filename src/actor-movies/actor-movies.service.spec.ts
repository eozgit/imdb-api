import { Test, TestingModule } from '@nestjs/testing';
import { ActorMoviesService } from './actor-movies.service';

describe('ActorMoviesService', () => {
  let service: ActorMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActorMoviesService],
    }).compile();

    service = module.get<ActorMoviesService>(ActorMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
