import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Movie, Actor } from './entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/movie')
  async getMovie(): Promise<Movie> {
    return await this.appService.getMovie();
  }

  @Get('/actor')
  async getActor(): Promise<Actor> {
    return await this.appService.getActor();
  }
}
