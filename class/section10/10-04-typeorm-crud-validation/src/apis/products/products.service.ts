import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,
      // 하나하나 직접 나열하는 방식
      //   name: '마우스',
      //   description: '좋은 마우스',
      //   price: 3000,
    });
    return result;
    // { id: akljdfq-1283aad,
    //	name: "마우스",
    //  description: "좋은 마우스",
    //  price: 3000 }
  }
  // 1. checkSoldout을 함수로 만다는 이유 => 수정시, 삭제시 등 같은 검증 로직 사용
  checkSoldout({ product }: IProductsServiceCheckSoldout) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }
  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 기존 있는 앵ㅇ을 재사용하여, 로직을 통일하자!
    const product = await this.findOne({ productId });
    // const product = await this.productsRepository.findOne({
    // where: { id: productId },
    // });
    // 검증은 서비스에서 하자!
    this.checkSoldout({ product });
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    // this.productsRepository.create(); // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체를 만들기 위함
    // this.productsRepository.insert(); // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update(); // 결과를 개체로 못 돌려 받는 수정 방법
    // save는 등록 후 객체를 찾는 과정을 한 번 더 거침 => 굳이 필요하지 않다면 불필요한 과정
    // save() 정보를 저장하고 정보를 리턴함
    //  1. id가 없으면 등록
    //  2. id가 있으면 수정
    return this.productsRepository.save({
      ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때
      ...updateProductInput,
    });
  }
}
