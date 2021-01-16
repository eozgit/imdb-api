import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ActorMovie } from './entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/actormovie')
  async getActorMovie(): Promise<ActorMovie> {
    return await this.appService.getActorMovie();
  }
}
