import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTicketInput } from './dto/create-tickets.input';
import { UpdateTicketInput } from './dto/update-tickets.input';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@Resolver()
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}
  @Mutation(() => Ticket)
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
  ) {
    return this.ticketsService.create({ createTicketInput });
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args('ticketId') ticketId: string,
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) {
    return this.ticketsService.update({ ticketId, updateTicketInput });
  }

  @Query(() => [Ticket])
  fetchTickets(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Query(() => Ticket)
  fetchTicket(@Args('ticketId') ticketId: string): Promise<Ticket> {
    return this.ticketsService.findOne({ ticketId });
  }

  @Mutation(() => Boolean)
  deleteTicket(@Args('ticketId') ticketId: string): Promise<boolean> {
    return this.ticketsService.delete({ ticketId });
  }

  @Query(() => [Ticket])
  fetchTicketWithDeleted(): Promise<Ticket[]> {
    return this.ticketsService.findAllWithDeleted();
  }

  @Mutation(() => Boolean)
  restoreTicket(@Args('ticketId') ticketId: string): Promise<boolean> {
    return this.ticketsService.restore({ ticketId });
  }
}
