import { CreateProductInput } from '../dto/create-product.input';
import { Product } from '../entities/products.entity';

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductsServiceUpdate {
  productId: string;
  updateProductInput: Partial<CreateProductInput>;
}
export interface IProductsServiceCheckSoldout {
  product: Product;
}
