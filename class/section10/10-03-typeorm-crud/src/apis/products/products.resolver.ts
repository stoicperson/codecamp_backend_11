import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { ProductsService } from './products.service';
import { Product } from './entities/products.entity';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly prodcutsService: ProductsService, //
  ) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.prodcutsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string): Promise<Product> {
    return this.prodcutsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    // << 브라우저에 결과 보내주는 2가지 방법 >>

    // 1. 등록된 내용이 담긴 객체를 그대로 브라우저에 돌려보내주기
    return this.prodcutsService.create({ createProductInput });

    // 2. 결과메세지만 간단히 보내주기
    // return '정상적으로 상품이 등록되었습니다.';
  }
}
