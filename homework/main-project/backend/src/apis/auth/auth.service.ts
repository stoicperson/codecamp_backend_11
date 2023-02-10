import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ email, pwd, context }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(pwd, user.pwd);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    this.setRefreshToken({ user, context });

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );

    context.res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );
  }

  restoreAccessToken({ context }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user: context.req.user });
  }
}
