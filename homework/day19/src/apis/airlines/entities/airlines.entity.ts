import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Airline {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  airline_name: string;

  @Column({ type: 'char', length: 2 })
  @Field(() => String)
  airline_code: string;
}
