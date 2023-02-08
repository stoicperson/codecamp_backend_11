import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateTicketInput {
  @Field(() => Date)
  arriving_time: Date;

  @Field(() => Date)
  departing_time: Date;

  @Field(() => String)
  arriving_gate: string;

  @Field(() => String)
  departing_gate: string;

  @Field(() => String)
  ticket_num: string;

  @Field(() => String, { nullable: true })
  ticket_image: string;

  @Field(() => String)
  travel_class: string;

  @Min(0)
  @Field(() => Int)
  limit_count: number;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String)
  departing_airportId: string;

  @Field(() => String)
  arriving_airportId: string;

  @Field(() => String)
  airlineId: string;
}
