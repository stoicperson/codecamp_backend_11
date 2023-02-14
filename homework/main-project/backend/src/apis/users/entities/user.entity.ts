import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PROVIDER_ENUM {
  GOOGLE = 'google',
  KAKAO = 'kakao',
  NAVER = 'naver',
  CREDENTIALS = 'credentials',
}

registerEnumType(PROVIDER_ENUM, {
  name: 'PROVIDER_ENUM',
});

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: 'credentials' })
  @Field(() => String, { nullable: true })
  providerId: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  koName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String)
  enFirstName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String)
  enLastName: string;

  @Column({ type: 'char', length: 8, nullable: true })
  @Field(() => String)
  birthDate: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'char', length: 11, nullable: true })
  @Field(() => String)
  mobile: string;

  @Column()
  // @Field(() => String)
  pwd: string;

  @Column({ type: 'char', length: 1, nullable: true })
  @Field(() => String)
  gender: string;

  @Column({ type: 'tinyint', nullable: true })
  @Field(() => Int)
  age: number;

  @Column({ type: 'enum', enum: PROVIDER_ENUM, default: 'credentials' })
  @Field(() => PROVIDER_ENUM)
  provider: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
