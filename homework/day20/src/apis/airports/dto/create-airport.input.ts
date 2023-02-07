import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AirportInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;
}
