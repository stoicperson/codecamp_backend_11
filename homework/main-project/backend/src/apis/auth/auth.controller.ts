import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IOauthUser } from 'src/commons/interfaces/oauthUser';
import { IProvider } from 'src/commons/interfaces/provider';
import { AuthService } from './auth.service';
import { SocialAuthGuard } from './guards/social-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Get('/')
  sayHello() {
    return 'hello';
  }

  @Get('/login/:social')
  @UseGuards(SocialAuthGuard)
  async loginGoogle(
    @Req() req: Request & IOauthUser & IProvider, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res, provider: req.params.soical });
  }
}
