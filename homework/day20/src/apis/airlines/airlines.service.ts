import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from './entities/airlines.entity';
import { IAirlinesServiceCreate } from './interfaces/airlines-service.interface';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectRepository(Airline)
    private readonly airlinesRepository: Repository<Airline>,
  ) {}

  create({ airlineInput }: IAirlinesServiceCreate): Promise<Airline> {
    return this.airlinesRepository.save({ ...airlineInput });
  }
}
