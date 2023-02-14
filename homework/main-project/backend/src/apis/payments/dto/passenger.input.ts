import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Passenger } from 'src/apis/passengers/entities/passenger.entity';

@InputType()
export class PassengerInput extends PartialType(
  OmitType(Passenger, ['id'], InputType),
) {}
