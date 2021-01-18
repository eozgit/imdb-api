import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ) { }

  getTime(): Date {
    return new Date();
  }
}
