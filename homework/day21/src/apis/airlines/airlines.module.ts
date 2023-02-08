import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesResolver } from './airlines.resolver';
import { AirlinesService } from './airlines.service';
import { Airline } from './entities/airlines.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Airline, //
    ]),
  ],
  providers: [
    AirlinesResolver, //
    AirlinesService,
  ],
})
export class AirlinesModule {}
