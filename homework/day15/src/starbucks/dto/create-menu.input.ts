import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  kcal: number;

  @Field(() => Number)
  fat: number;

  @Field(() => Number)
  protein: number;

  @Field(() => Number)
  sodium: number;

  @Field(() => Number)
  sugar: number;

  @Field(() => Number)
  caffeine: number;
}
