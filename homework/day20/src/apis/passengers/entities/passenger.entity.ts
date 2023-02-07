import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Passenger {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  ko_name: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  en_first_name: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  en_last_name: string;

  @Column({ type: 'char', length: 8 })
  @Field(() => String)
  birth_date: string;

  @Column({ type: 'varchar', length: 30 })
  @Field(() => String)
  email: string;

  @Column({ type: 'char', length: 11 })
  @Field(() => String)
  mobile: string;

  @Column({ type: 'char', length: 1 })
  @Field(() => String)
  gender: string;
}
