import { Airline } from '../../airlines/entities/airlines.entity';
import { Airport } from '../../airports/entities/airport.entity';
import {
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  arrivingTime: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  departingTime: Date;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  arrivingGate: string;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  departingGate: string;

  @Column({ type: 'char', length: 11 })
  @Field(() => String)
  ticketNum: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String)
  ticketImage: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  travelClass: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  limitCount: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  price: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Airport)
  @Field(() => Airport)
  arrivingAirport: Airport;

  @ManyToOne(() => Airport)
  @Field(() => Airport)
  departingAirport: Airport;

  @ManyToOne(() => Airline)
  @Field(() => Airline)
  airline: Airline;
}
