import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { MockActorRepository } from './actors.service.spec';
import { Actor } from './entities/actor.entity';

describe('ActorsController', () => {
  let controller: ActorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorsController],
      providers: [ActorsService,
        {
          provide: getRepositoryToken(Actor),
          useValue: MockActorRepository,
        }],
    }).compile();

    controller = module.get<ActorsController>(ActorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
