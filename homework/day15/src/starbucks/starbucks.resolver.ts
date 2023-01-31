import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateMenuInput } from './dto/create-menu.input';
import { Starbuck } from './entities/starbuck.entity';
import { StarbucksService } from './starbucks.service';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarbucksService) {}

  @Query(() => [Starbuck])
  fetchStarbucks(): Starbuck[] {
    return this.starbucksService.getStarbucks();
  }
  @Mutation(() => String)
  createMenu(@Args('createMenuInput') createMenuInput: CreateMenuInput) {
    return this.starbucksService.createStarbucksMenu({ createMenuInput });
  }
}
