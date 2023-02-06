import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Passenger } from 'src/apis/passengers/entities/passenger.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'char', length: 14 })
  @Field(() => String)
  trans_num: string;

  @Column({ type: 'tinyint' })
  @Field(() => String)
  trans_status: number;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  created_at: Date;

  @ManyToOne(() => Ticket)
  @Field(() => Ticket)
  ticket: Ticket;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Passenger)
  @Field(() => Passenger)
  passenger: Passenger;
}
