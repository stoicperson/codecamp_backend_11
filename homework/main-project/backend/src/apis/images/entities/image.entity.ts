import { Field, ObjectType } from '@nestjs/graphql';
import { Ticket } from 'src/apis/tickets/entities/ticket.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.images)
  @Field(() => Ticket)
  ticket: Ticket;
}
