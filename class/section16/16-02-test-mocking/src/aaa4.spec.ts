import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

class MockAppService {
  getHello(): string {
    return '나는 가짜다.';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를ㄹ 리턴해야 함!!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // describe('fetchBoards', () => {
  //   const appService = new AppService();
  //   const appController = new AppController(appService);
  // });

  // describe('createBoards', () => {
  //   const appService = new AppService();
  //   const appController = new AppController(appService);
  // });
});
