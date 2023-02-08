import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  koName: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  enFirstName: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  enLastName: string;

  @Column({ type: 'char', length: 8 })
  @Field(() => String)
  birthDate: string;

  @Column({ type: 'varchar', length: 30 })
  @Field(() => String)
  email: string;

  @Column({ type: 'char', length: 11 })
  @Field(() => String, { nullable: true })
  mobile: string;

  @Column()
  // @Field(() => String)
  pwd: string;

  @Column({ type: 'char', length: 1 })
  @Field(() => String)
  gender: string;

  @Column({ type: 'tinyint' })
  @Field(() => Int)
  age: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
