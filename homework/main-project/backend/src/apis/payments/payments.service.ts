import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Passenger } from '../passengers/entities/passenger.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import {
  IPaymentsServiceCancel,
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

    private readonly iamportService: IamportService,

    private readonly dataSource: DataSource,
  ) {}
  async create({
    impUid,
    ticketId,
    amount,
    passengerInput,
    user: _user,
  }: IPaymentsServiceCreate): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const passenger = await queryRunner.manager.save(Passenger, {
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

      const paymentData = await this.iamportService.getPaymentData({ impUid });

      await this.verifyDuplication({ impUid });

      await this.verifyAmount({ amount, imp_payment: paymentData.amount });

      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();
      return payment;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
    } finally {
      await queryRunner.release();
    }
  }

  async cancel({
    impUid,
    user,
    refundAmount,
  }: IPaymentsServiceCancel): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const totalAmount = await queryRunner.manager.sum(Payment, 'amount', {
        impUid,
        user: { id: user.id },
      });

      console.log(totalAmount);

      await this.verfiyRefund({ totalAmount, refundAmount });

      const response = await this.iamportService.refund({
        impUid,
        totalAmount,
        refundAmount,
      });

      await this.verifyCancel({ status: response.status });

      const payment = await queryRunner.manager.findOne(Payment, {
        where: {
          impUid,
        },
        lock: { mode: 'pessimistic_write' },
        relations: ['user', 'ticket'],
      });

      const { id, ...restPayment } = payment;

      const result = await queryRunner.manager.save(Payment, {
        ...restPayment,
        amount: -refundAmount,
        status: PAYMENT_STATUS_ENUM.CANCEL,
      });

      await queryRunner.commitTransaction();

      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
    } finally {
      await queryRunner.release();
    }
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

  async verfiyRefund({
    totalAmount,
    refundAmount,
  }: IPaymentsVerifyRefund): Promise<void> {
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

  async verifyCancel({ status }: IPaymentsVerifyCancel): Promise<void> {
    if (status !== 'cancelled') {
      throw new UnprocessableEntityException(
        '결제 취소 처리가 되지 않았습니다.',
      );
    }
  }
}
