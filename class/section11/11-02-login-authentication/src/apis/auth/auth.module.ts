import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
