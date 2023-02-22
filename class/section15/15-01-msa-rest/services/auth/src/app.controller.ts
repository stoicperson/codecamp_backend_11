import { Controller, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}

  @MessagePattern({ qqq: '이름' })
  login(data) {
    // 로그인 진행
    console.log(data);
    return 'accessToken!!!';
  }

  @Post('/auth/logout')
  logout() {
    // 로그아웃 진행
  }

  restoreAccessToken() {
    // 엑서스 토큰 재발급
  }
}
