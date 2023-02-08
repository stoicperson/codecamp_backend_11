import { Airline } from '../../airlines/entities/airlines.entity';
import { Airport } from '../../airports/entities/airport.entity';
import {
  Column,
  DeleteDateColumn,
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
  arriving_time: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  departing_time: Date;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  arriving_gate: string;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  departing_gate: string;

  @Column({ type: 'char', length: 11 })
  @Field(() => String)
  ticket_num: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String)
  ticket_image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  created_at: Date;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  travel_class: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  limit_count: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  price: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Airport)
  @Field(() => Airport)
  arriving_airport: Airport;

  @ManyToOne(() => Airport)
  @Field(() => Airport)
  departing_airport: Airport;

  @ManyToOne(() => Airline)
  @Field(() => Airline)
  airline: Airline;
}
