import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';
import { IPassengersServiceCreate } from './interface/passengers-service.interface';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengersRepository: Repository<Passenger>,
  ) {}

  create({ passengerInput }: IPassengersServiceCreate): Promise<Passenger> {
    return this.passengersRepository.save({
      ...passengerInput,
    });
  }
}
