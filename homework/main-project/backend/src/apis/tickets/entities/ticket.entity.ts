import { Airline } from '../../airlines/entities/airlines.entity';
import { Airport } from '../../airports/entities/airport.entity';
import {
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Image } from 'src/apis/images/entities/image.entity';

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

  @OneToMany(() => Image, (image) => image.ticket)
  @Field(() => [Image])
  images: Image[];

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
