import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

// import {Strategy} from 'passport-kakao';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        const temp = req.headers.cookie; // refreshToken=af23#(28@!9s...
        const refreshToken = temp.replace('refreshToken=', '');
        return refreshToken;
      }, //refreshToken
      secretOrKey: 'a', // 나의 비밀번호
    });
  }

  validate(payload) {
    console.log(payload);

    return {
      id: payload.sub,
    };
  }
}
