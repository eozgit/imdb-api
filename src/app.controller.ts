import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Actor, ActorMovie } from './entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/actor')
  async getActor(): Promise<Actor> {
    return await this.appService.getActor();
  }

  @Get('/actormovie')
  async getActorMovie(): Promise<ActorMovie> {
    return await this.appService.getActorMovie();
  }
}
