import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { Actor } from './entities/actor.entity';

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
  imports: [
    TypeOrmModule.forFeature([Actor]),
  ]
})
export class ActorsModule {}
