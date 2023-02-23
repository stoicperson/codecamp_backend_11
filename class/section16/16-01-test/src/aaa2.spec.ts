import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  const appService = new AppService();
  const appController = new AppController(appService);

  beforeEach(() => {
    // appService =
    // appController =
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
