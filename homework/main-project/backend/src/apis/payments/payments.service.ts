import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { PassengersService } from '../passengers/passengers.service';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import {
  IPaymentsServiceCreate,
  IPaymentsVerifyAmount,
  IPaymentsVerifyCancel,
  IPaymentsVerifyDuplication,
  IPaymentsVerifyRefund,
} from './interfaces/payments-service.interface';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,

    private readonly passengersService: PassengersService,

    private readonly iamportService: IamportService,
  ) {}
  async create({
    impUid,
    ticketId,
    amount,
    passengerInput,
    user: _user,
  }: IPaymentsServiceCreate): Promise<Payment> {
    const passenger = await this.passengersService.create({ passengerInput });

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

    const paymentData = await this.iamportService.getPaymentData({ impUid });

    await this.verifyDuplication({ impUid });

    await this.verifyAmount({ amount, imp_payment: paymentData.amount });

    await this.paymentsRepository.save(payment);

    return payment;
  }

  async cancel({ impUid, refundAmount }) {
    const totalAmount = await this.paymentsRepository.sum('amount', {
      impUid,
    });

    console.log(totalAmount);

    await this.verfiyRefund({ totalAmount, refundAmount });

    const response = await this.iamportService.refund({
      impUid,
      totalAmount,
      refundAmount,
    });

    await this.verifyCancel({ status: response.status });

    const payment = await this.paymentsRepository.findOne({
      where: {
        impUid,
      },
      relations: ['user', 'ticket'], // 실제 서비스에서 결제 정보 외 나머지 정보를 저장하나요?
    });

    const { id, ...restPayment } = payment;

    return this.paymentsRepository.save({
      ...restPayment,
      amount: -refundAmount,
      status: PAYMENT_STATUS_ENUM.CANCEL,
    });
  }

  async verifyAmount({
    amount,
    imp_payment,
  }: IPaymentsVerifyAmount): Promise<void> {
    if (amount !== imp_payment) {
      throw new UnprocessableEntityException('결제 정보가 위조되었습니다.');
    }
  }

  async verifyDuplication({
    impUid,
  }: IPaymentsVerifyDuplication): Promise<void> {
    const payment = await this.paymentsRepository.findOne({
      where: {
        impUid,
      },
    });

    if (payment) throw new ConflictException('이미 처리된 결제 정보입니다.');
  }

  async verfiyRefund({ totalAmount, refundAmount }: IPaymentsVerifyRefund) {
    if (typeof totalAmount === 'object') {
      throw new UnprocessableEntityException('존재하지 않는 결제정보입니다.');
    }
    if (!totalAmount) {
      throw new UnprocessableEntityException('결제가 이미 취소되었습니다.');
    }
    if (totalAmount < refundAmount) {
      throw new UnprocessableEntityException(
        '결제 금액보다 환불 금액이 더 큽니다.',
      );
    }
  }

  async verifyCancel({ status }: IPaymentsVerifyCancel) {
    if (status !== 'cancelled') {
      throw new UnprocessableEntityException(
        '결제 취소 처리가 되지 않았습니다.',
      );
    }
  }
}
