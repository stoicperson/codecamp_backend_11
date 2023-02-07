import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AirlineInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;
}
