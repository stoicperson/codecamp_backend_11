import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportsResolver } from './airports.resolver';
import { AirportsService } from './airports.service';
import { Airport } from './entities/airport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Airport, //
    ]),
  ],
  providers: [
    AirportsResolver, //
    AirportsService,
  ],
})
export class AirPortsModule {}
