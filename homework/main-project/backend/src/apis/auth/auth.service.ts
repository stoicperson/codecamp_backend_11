import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceAccessToken,
  IAuthServiceLogin,
  IAuthServiceLogout,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  IAuthSocialLogin,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  async login({ email, pwd, context }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(pwd, user.pwd);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    this.setRefreshToken({ user, res: context.res });

    return this.getAccessToken({ user });
  }

  async logout({ context }: IAuthServiceLogout): Promise<string> {
    const refreshToken = context.req.headers.cookie.replace(
      'refreshToken=',
      '',
    );
    const accessToken = context.req.headers.authorization.replace(
      'Bearer ',
      '',
    );

    await Promise.all([
      this.cacheManager.set('refreshToken', refreshToken, { ttl: 604800 }),
      this.cacheManager.set('accessToken', accessToken, { ttl: 3600 }),
    ]);

    this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_KEY,
    });
    this.jwtService.verify(accessToken, {
      secret: process.env.JWT_ACCESS_KEY,
    });

    return '로그아웃에 성공했습니다';
  }

  getAccessToken({ user }: IAuthServiceAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '1w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  restoreAccessToken({ context }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user: context.req.user });
  }

  async socialLogin({ req, res, provider }: IAuthSocialLogin) {
    let user = await this.usersService.findOneByProviderId({
      id: req.user.id,
    });
    if (!user)
      user = await this.usersService.createOauthUser({ ...req.user, provider });
    this.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/login');
  }
}
