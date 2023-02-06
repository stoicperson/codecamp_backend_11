import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import {
  ITicketServiceCheckLimitCount,
  ITicketServiceCreate,
  ITicketServiceFindOne,
  ITicketServiceUpdate,
} from './interfaces/tickets-service.interface';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}
  create({ createTicketInput }: ITicketServiceCreate): Promise<Ticket> {
    return this.ticketsRepository.save({
      ...createTicketInput,
    });
  }

  async update({
    ticketId,
    updateTicketInput,
  }: ITicketServiceUpdate): Promise<Ticket> {
    const ticket = await this.findOne({ ticketId });
    this.checkLimitCount({ ticket });
    return this.ticketsRepository.save({
      ...ticket,
      ...updateTicketInput,
    });
  }
  checkLimitCount({ ticket }: ITicketServiceCheckLimitCount): void {
    if (ticket.limit_count <= 0) {
      throw new UnprocessableEntityException('좌석이 전부 매진되었습니다.');
    }
  }
  findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find();
  }
  findOne({ ticketId }: ITicketServiceFindOne): Promise<Ticket> {
    return this.ticketsRepository.findOne({
      where: {
        id: ticketId,
      },
    });
  }
}
