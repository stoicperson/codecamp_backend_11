import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/product')
  getHello(): string {
    return 'Hello World!';
  }

  // fetchBoards() {}s

  // createBoards() {}
}
