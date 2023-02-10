import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [
    AuthResolver, //
    AuthService,
    JwtAccessStrategy, // 전역으로 작동
  ],
})
export class AuthModule {}
