import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Passenger } from '../passengers/entities/passenger.entity';
import { PassengersService } from '../passengers/passengers.service';
import { User } from '../users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentsResolver } from './payments.resolver';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Passenger]), HttpModule],
  providers: [
    PaymentsResolver,
    PaymentsService,
    PassengersService,
    IamportService,
  ],
})
export class PaymentModule {}
