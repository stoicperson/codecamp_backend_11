import { CreateTicketInput } from '../dto/create-tickets.input';
import { Ticket } from '../entities/ticket.entity';

export interface ITicketServiceCreate {
  createTicketInput: CreateTicketInput;
}

export interface ITicketServiceUpdate {
  ticketId: string;
  updateTicketInput: Partial<CreateTicketInput>;
}

export interface ITicketServiceCheckLimitCount {
  ticket: Ticket;
}

export interface ITicketServiceFindOne {
  ticketId: string;
}

export interface ITicketServiceDelete {
  ticketId: string;
}

export interface ITicketServiceRestore {
  ticketId: string;
}
