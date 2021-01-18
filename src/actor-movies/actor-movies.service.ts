import { Injectable } from '@nestjs/common';
import { CreateActorMovieDto } from './dto/create-actor-movie.dto';
import { UpdateActorMovieDto } from './dto/update-actor-movie.dto';

@Injectable()
export class ActorMoviesService {
  create(createActorMovieDto: CreateActorMovieDto) {
    return 'This action adds a new actorMovie';
  }

  findAll() {
    return `This action returns all actorMovies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actorMovie`;
  }

  update(id: number, updateActorMovieDto: UpdateActorMovieDto) {
    return `This action updates a #${id} actorMovie`;
  }

  remove(id: number) {
    return `This action removes a #${id} actorMovie`;
  }
}
