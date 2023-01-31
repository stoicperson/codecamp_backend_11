import { Injectable } from '@nestjs/common';
import { CreateMenuInput } from './dto/create-menu.input';
import { Starbuck } from './entities/starbuck.entity';

@Injectable()
export class StarbucksService {
  getStarbucks(): Starbuck[] {
    return [
      {
        number: 1,
        name: '아메리카노',
        kcal: 10,
        caffeine: 10,
        fat: 10,
        price: 10,
        protein: 10,
        sodium: 10,
        sugar: 10,
      },
      {
        number: 2,
        name: '에스프레소',
        kcal: 20,
        caffeine: 20,
        fat: 20,
        price: 20,
        protein: 20,
        sodium: 20,
        sugar: 20,
      },
      {
        number: 3,
        name: '카페라떼',
        kcal: 300,
        caffeine: 300,
        fat: 300,
        price: 300,
        protein: 300,
        sodium: 300,
        sugar: 300,
      },
      {
        number: 4,
        name: '카푸치노',
        kcal: 40,
        caffeine: 40,
        fat: 40,
        price: 40,
        protein: 40,
        sodium: 40,
        sugar: 40,
      },
      {
        number: 5,
        name: '카페모카',
        kcal: 55,
        caffeine: 50,
        fat: 50,
        price: 50,
        protein: 50,
        sodium: 50,
        sugar: 50,
      },
    ];
  }
  createStarbucksMenu({
    createMenuInput,
  }: {
    createMenuInput: CreateMenuInput;
  }): string {
    console.log(createMenuInput);
    return '등록에 성공하였습니다.';
  }
}
