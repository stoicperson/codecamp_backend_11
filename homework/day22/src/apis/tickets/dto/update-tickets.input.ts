import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTicketInput } from './create-tickets.input';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {}
