import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTIONS_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTIONS_STATUS_ENUM, {
  name: 'POINT_TRANSACTIONS_STATUS_ENUM',
});

@ObjectType()
@Entity()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  impUid: string;

  @Field(() => Int)
  @Column()
  amount: number;

  @Field(() => POINT_TRANSACTIONS_STATUS_ENUM)
  @Column({ type: 'enum', enum: POINT_TRANSACTIONS_STATUS_ENUM })
  status: POINT_TRANSACTIONS_STATUS_ENUM;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
