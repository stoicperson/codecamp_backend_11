import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Context() context: IContext,
    @Args('email') email: string, //
    @Args('password') pwd: string,
  ): Promise<string> {
    return this.authService.login({ email, pwd, context });
  }

  @Mutation(() => String)
  async logout(
    @Context() context: IContext, //
  ): Promise<string> {
    return this.authService.logout({ context });
  }

  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => String)
  restoreAccessToken(@Context() context: IContext): string {
    return this.authService.restoreAccessToken({ context });
  }
}
