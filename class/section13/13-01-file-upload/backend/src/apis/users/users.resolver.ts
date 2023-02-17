import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('passsword') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }

  @UseGuards(GqlAuthGuard('access')) //rest api의 인가 방식
  @Query(() => String)
  fetchUser(@Context() context: IContext): string {
    console.log('===================');
    console.log(context.req.user);
    console.log('===================');
    return '인가 성공';
  }
}
