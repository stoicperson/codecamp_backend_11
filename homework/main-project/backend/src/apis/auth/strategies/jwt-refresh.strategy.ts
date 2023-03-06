import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const temp = req.headers.cookie;
        const refreshToken = temp.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    const refreshToken = req.headers.cookie.replace('refreshToken=', '');
    const cachedRefreshToken = await this.cacheManager.get('refreshToken');

    if (cachedRefreshToken === refreshToken) {
      throw new UnauthorizedException('로그아웃한 토큰입니다.');
    }
    return {
      id: payload.sub,
    };
  }
}
