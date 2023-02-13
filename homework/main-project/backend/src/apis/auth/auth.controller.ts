import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { IOauthUser } from 'src/commons/interfaces/oauthUser';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Get('/')
  sayHello() {
    return 'hello';
  }

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOauthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res, provider: 'google' });
  }

  @UseGuards(AuthGuard('naver'))
  @Get('/login/naver')
  async loginNaver(
    @Req() req: Request & IOauthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res, provider: 'naver' });
  }
  @UseGuards(AuthGuard('kakao'))
  @Get('/login/kakao')
  async loginKakao(
    @Req() req: Request & IOauthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res, provider: 'kakao' });
  }
}
