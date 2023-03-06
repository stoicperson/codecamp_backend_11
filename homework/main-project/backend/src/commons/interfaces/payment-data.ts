import { PAYMENT_STATUS_ENUM } from 'src/apis/payments/entities/payment.entity';

export interface PaymentData {
  status: PAYMENT_STATUS_ENUM;
  amount: number;
}
