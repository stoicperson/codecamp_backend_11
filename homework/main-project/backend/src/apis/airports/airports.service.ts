import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from './entities/airport.entity';
import { IAirPortsServiceCreate } from './interfaces/airports-service.interface';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airport)
    private readonly airportsRepository: Repository<Airport>,
  ) {}

  create({ airportInput }: IAirPortsServiceCreate): Promise<Airport> {
    return this.airportsRepository.save({ ...airportInput });
  }
}
