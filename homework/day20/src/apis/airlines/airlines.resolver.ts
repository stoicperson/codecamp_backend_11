import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AirlinesService } from './airlines.service';
import { AirlineInput } from './dto/create-airline.input';
import { Airline } from './entities/airlines.entity';

@Resolver()
export class AirlinesResolver {
  constructor(
    private readonly airlinesService: AirlinesService, //
  ) {}

  @Mutation(() => Airline)
  createAirline(@Args('airlineInput') airlineInput: AirlineInput) {
    return this.airlinesService.create({ airlineInput });
  }
}
