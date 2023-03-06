import { Field, InputType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(User, InputType) {
  @Field(() => String, { nullable: true })
  pwd: string;
}
