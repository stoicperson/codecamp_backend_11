import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateTicketInput {
  @Field(() => Date)
  arrivingTime: Date;

  @Field(() => Date)
  departingTime: Date;

  @Field(() => String)
  arrivingGate: string;

  @Field(() => String)
  departingGate: string;

  @Field(() => String)
  ticketNum: string;

  @Field(() => String, { nullable: true })
  ticketImage: string;

  @Field(() => String)
  travelClass: string;

  @Min(0)
  @Field(() => Int)
  limitCount: number;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String)
  departingAirportId: string;

  @Field(() => String)
  arrivingAirportId: string;

  @Field(() => String)
  airlineId: string;
}
