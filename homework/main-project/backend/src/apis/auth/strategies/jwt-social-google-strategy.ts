import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  validate(request, accessToken, refreshToken, profile, done) {
    return {
      name: profile.displayName || '홍길동',
      id: profile.id,
    };
  }
}
