import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Movie } from './entity/movie';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<Movie> {
    return await this.appService.getHello();
  }
}
