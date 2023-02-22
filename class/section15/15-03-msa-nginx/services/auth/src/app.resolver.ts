import { Mutation, Query, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Query(() => String)
  aaa() {
    return 'aaa';
  }

  @Mutation(() => String)
  login() {
    return 'accessToken!!';
  }
}
