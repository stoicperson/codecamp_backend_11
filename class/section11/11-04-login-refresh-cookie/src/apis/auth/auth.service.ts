import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly usersService: UsersService, //
  ) {}
  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면? 에러 던지기
    if (!user) throw new UnprocessableEntityException();

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸을 때
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnauthorizedException();

    // 4. refreshToken(=JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기
    this.setRefreshToken({ user, context });

    // 5. 일치하는 유저도 있고, 비밀번호도 맞았을 떄
    //   => accessToken(=JWT)를 만들어서 브라우저에 전달하기
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id }, //
      { secret: 'a', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );

    // 개발환경
    context.res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // 배포환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybackendsite.com; SameSite=None; Secure; HttpOnly`,
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'https://myfrontsite.com',
    // );
  }
}
