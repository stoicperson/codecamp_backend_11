import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Passenger } from 'src/apis/passengers/entities/passenger.entity';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum PAYMENT_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(PAYMENT_STATUS_ENUM, {
  name: 'POINT_TRANSACTIONS_STATUS_ENUM',
});

@ObjectType()
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Field(() => PAYMENT_STATUS_ENUM)
  @Column({ type: 'enum', enum: PAYMENT_STATUS_ENUM })
  status: PAYMENT_STATUS_ENUM;

  @Field(() => Int)
  @Column()
  amount: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => Ticket)
  @Field(() => Ticket)
  ticket: Ticket;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Passenger)
  @Field(() => Passenger, { nullable: true })
  passenger: Passenger;
}
