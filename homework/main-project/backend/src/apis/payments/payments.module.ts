import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from '../passengers/entities/passenger.entity';
import { User } from '../users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentsResolver } from './payments.resolver';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Passenger])],
  providers: [PaymentsResolver, PaymentsService],
})
export class PaymentModule {}
