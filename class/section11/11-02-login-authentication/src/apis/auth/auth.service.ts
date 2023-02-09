import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly usersService: UsersService, //
  ) {}
  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면? 에러 던지기
    if (!user) throw new UnprocessableEntityException();

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸을 때
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnauthorizedException();

    //4. 일치하는 유저도 있고, 비밀번호도 맞았을 떄
    //   => accessToken(=JWT)를 만들어서 브라우저에 전달하기
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id }, //
      { secret: 'msssss', expiresIn: '1h' },
    );
  }
}
