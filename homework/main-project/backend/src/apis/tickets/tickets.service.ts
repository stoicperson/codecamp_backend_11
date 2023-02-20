import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
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

    private readonly imagesService: ImagesService,

    private readonly filesService: FilesService,
  ) {}

  async create({ createTicketInput }: ITicketServiceCreate): Promise<Ticket> {
    const {
      airlineId,
      departingAirportId,
      arrivingAirportId,
      imageUrls,
      ...ticket
    } = createTicketInput;

    const images = await this.imagesService.createMany({ imageUrls });

    const result = await this.ticketsRepository.save({
      ...ticket,
      images,
      arrivingAirport: {
        id: arrivingAirportId,
      },
      departingAirport: {
        id: departingAirportId,
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

    const existingImages = await this.imagesService.findById({ ticketId });

    const imagesToBeSaved = [],
      imageIds = [],
      imagesMap = new Map(existingImages.map((el) => [el.url, el.id]));
    let imagesToBeDeleted: string[] = [];

    updateTicketInput.imageUrls.forEach((el) => {
      if (imagesMap.has(el)) {
        imageIds.push(imagesMap.get(el));
        imagesMap.delete(el);
      } else {
        imagesToBeSaved.push(el);
      }
    });

    imagesToBeDeleted = [...imagesMap.values()];
    if (imagesToBeDeleted.length) {
      await this.imagesService.delete({ ids: imagesToBeDeleted });
    }

    await this.filesService.delete({
      filenames: [...imagesMap.keys()].map((el) => el.split('/').at(-1)),
    });

    let images: Image[] = [];
    if (imagesToBeSaved.length) {
      images = await this.imagesService.createMany({
        imageUrls: imagesToBeSaved,
      });
    }

    return this.ticketsRepository.save({
      ...ticket,
      ...updateTicketInput,
      images: [...imageIds.map((id) => ({ id })), ...images],
    });
  }
  checkLimitCount({ ticket }: ITicketServiceCheckLimitCount): void {
    if (ticket.limitCount <= 0) {
      throw new UnprocessableEntityException('좌석이 전부 매진되었습니다.');
    }
  }
  findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      relations: ['departingAirport', 'arrivingAirport', 'airline'],
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
      relations: ['departingAirport', 'arrivingAirport', 'airline'],
    });
  }

  async restore({ ticketId }: ITicketServiceRestore): Promise<boolean> {
    const result = await this.ticketsRepository.restore({
      id: ticketId,
    });

    return result.affected ? true : false;
  }
}
