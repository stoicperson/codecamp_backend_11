import { Injectable, Scope } from '@nestjs/common';

//                                    // injection-scope  => 싱글톤(new 한 번)으로 할래? 말래?
//                                    //                     Request 스포크(매 요청마다 new)로 할래?
@Injectable({ scope: Scope.DEFAULT }) //                     Transient 스코프(매 주입마다 new)로 할래?
export class BoardsService {
  qqq(): string {
    return 'Hello World!';
  }
}
