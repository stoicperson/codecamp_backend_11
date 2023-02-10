import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update({ userId, updateUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUserPwd(
    @Args('password') pwd: string,
    @Context() context: IContext,
  ): Promise<User> {
    return this.usersService.updatePwd({
      userId: context.req.user.id,
      pwd,
    });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.usersService.delete({ userId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteLoginUser(@Context() context: IContext): Promise<boolean> {
    return this.usersService.delete({ userId: context.req.user.id });
  }

  @Query(() => User)
  fetchUser(@Args('userId') userId: string): Promise<User> {
    return this.usersService.findOne({ userId });
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchLoginUser(
    @Context() context: IContext, //
  ): Promise<User> {
    return this.usersService.findOne({ userId: context.req.user.id });
  }
}
