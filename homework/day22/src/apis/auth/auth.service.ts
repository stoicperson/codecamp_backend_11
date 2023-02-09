import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceAccessToken,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ email, pwd }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(pwd, user.pwd);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '1234', expiresIn: '1h' },
    );
  }
}
