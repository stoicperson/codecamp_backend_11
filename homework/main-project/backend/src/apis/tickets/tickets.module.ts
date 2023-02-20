import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { Ticket } from './entities/ticket.entity';
import { TicketsResolver } from './tickets.resolver';
import { TicketsService } from './tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Image])],
  providers: [TicketsResolver, TicketsService, ImagesService, FilesService],
})
export class TicketsModule {}
