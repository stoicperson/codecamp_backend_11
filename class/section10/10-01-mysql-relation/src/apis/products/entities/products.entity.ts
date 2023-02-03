import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from '../../productsCategories/entities/productsCategory.entity';
import { ProductSaleslocation } from '../../productsSaleslocations/entities/productsSaleslocation.entity';
import { ProductTag } from '../../productsTags/entities/productsTag.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false })
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
