import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import {
  ITicketServiceCheckLimitCount,
  ITicketServiceCreate,
  ITicketServiceDelete,
  ITicketServiceFindOne,
  ITicketServiceRestore,
  ITicketServiceUpdate,
} from './interfaces/tickets-service.interface';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}

  async create({ createTicketInput }: ITicketServiceCreate): Promise<Ticket> {
    const { airlineId, departing_airportId, arriving_airportId, ...ticket } =
      createTicketInput;
    const result = await this.ticketsRepository.save({
      ...ticket,
      arriving_airport: {
        id: arriving_airportId,
      },
      departing_airport: {
        id: departing_airportId,
      },
      airline: {
        id: airlineId,
      },
    });
    return result;
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
    return this.ticketsRepository.find({
      relations: ['departing_airport', 'arriving_airport', 'airline'],
    });
  }
  findOne({ ticketId }: ITicketServiceFindOne): Promise<Ticket> {
    return this.ticketsRepository.findOne({
      where: {
        id: ticketId,
      },
    });
  }
  async delete({ ticketId }: ITicketServiceDelete): Promise<boolean> {
    const result = await this.ticketsRepository.softDelete({ id: ticketId });

    return result.affected ? true : false;
  }
  findAllWithDeleted(): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      withDeleted: true,
      relations: ['departing_airport', 'arriving_airport', 'airline'],
    });
  }

  async restore({ ticketId }: ITicketServiceRestore): Promise<boolean> {
    const result = await this.ticketsRepository.restore({
      id: ticketId,
    });

    return result.affected ? true : false;
  }
}
