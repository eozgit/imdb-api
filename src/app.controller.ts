import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getTime(): Date {
    return this.appService.getTime();
  }

  @Post()
  echo(@Body() { text }): string {
    return text;
  }
}
