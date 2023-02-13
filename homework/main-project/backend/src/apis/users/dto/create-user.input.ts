import { Field, InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ['id', 'createdAt', 'updatedAt', 'deleteAt', 'provider', 'providerId'],
  InputType,
) {
  @Field(() => String)
  pwd: string;
}
// export class CreateUserInput {
//   @Field(() => String)
//   ko_name: string;

//   @Field(() => String)
//   en_first_name: string;

//   @Field(() => String)
//   en_last_name: string;

//   @Field(() => String)
//   birth_date: string;

//   @Field(() => String)
//   email: string;

//   @Field(() => String, { nullable: true })
//   mobile: string;

//   @Field(() => String)
//   gender: string;

//   @Field(() => String)
//   pwd: string;

//   @Field(() => Int)
//   age: number;
// }
