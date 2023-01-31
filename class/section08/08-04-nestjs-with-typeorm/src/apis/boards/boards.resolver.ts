import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

// @Controller()
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  // @Get('/product')
  @Query(() => String)
  getHello(): string {
    return this.boardsService.qqq();
  }
}
