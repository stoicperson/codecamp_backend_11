import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AirportsService } from './airports.service';
import { AirportInput } from './dto/create-airport.input';
import { Airport } from './entities/airport.entity';

@Resolver()
export class AirportsResolver {
  constructor(
    private readonly airportsService: AirportsService, //
  ) {}

  @Mutation(() => Airport)
  createAirport(
    @Args('airportInput') airportInput: AirportInput, //
  ): Promise<Airport> {
    return this.airportsService.create({ airportInput });
  }
}
