import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from '../passengers/entities/passenger.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import { IPaymentsServiceCreate } from './interfaces/payments-service.interface';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(Passenger)
    private readonly passengersRepository: Repository<Passenger>,
  ) {}
  async create({
    impUid,
    ticketId,
    amount,
    passengerInput,
    user: _user,
  }: IPaymentsServiceCreate): Promise<Payment> {
    // 나중에 passenger module로 빼기
    const passenger = await this.passengersRepository.save({
      ...passengerInput,
    });

    const payment = this.paymentsRepository.create({
      impUid,
      ticket: {
        id: ticketId,
      },
      amount,
      passenger: {
        ...passenger,
      },
      status: PAYMENT_STATUS_ENUM.PAYMENT,
      user: _user,
    });

    // impUid로 결제 정보 불러오고 받은 데이터와 비교
    // 맞으면 데이터 저장 아니면 에러
    await this.paymentsRepository.save(payment);

    return payment;
  }
}
