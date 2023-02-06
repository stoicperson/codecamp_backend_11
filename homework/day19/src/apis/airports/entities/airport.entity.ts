import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Airport {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  airport_name: string;

  @Column({ type: 'char', length: 2 })
  @Field(() => String)
  airport_code: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  country: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  city: string;
}
