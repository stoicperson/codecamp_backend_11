import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productSaleslocations.service';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
    private readonly productsSaleslocationService: ProductsSaleslocationsService
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation'],
    });
  }

  async create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    // ...createProductInput,
    //
    // 하나 하나 직접 나열하는 방식
    //   name: '마우스',
    //   description: '좋은 마우스',
    //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const { productSaleslocation, ...product } = createProductInput;

    const result = await this.productsSaleslocationService.create({
      ...productSaleslocation,
    }); // 서비스를 타고 가는 이유는...?(레파지토리에 직접 접근하면 안될까...?) => 검증을 서비스에서 진행하기 때문

    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기

      // 하나하나 직접 나열하는 방식
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // productSaleslocation: {
      //   id: result.id,
      // },
    });

    // 최종 결과 돌려주기
    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!!
    this.checkSoldout({ product });

    // this.productsRepository.create(); // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert(); // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update(); // 결과를 객체로 못 돌려 받는 수정 방법

    const result = this.productsRepository.save({
      ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을 때
      ...updateProductInput,
    });
    return result;
  }

  // checkSoldout을 함수로 만드는 이유 => 수정시, 삭제시 등 같은 검증 로직 사용
  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // 단점: id로만 삭제 가능
    //                                                        // 장점: 여러ID 한번에 지우기 가능
    //                                                        //      .softRemove([{id: qqq}, {id: aaa}, {id: zzz}])

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 단점: 여러ID 한번에 지우기 불가능
    return result.affected ? true : false; //                                   // 장점: 다른 컬럼으로도 삭제 가능
  }
}
