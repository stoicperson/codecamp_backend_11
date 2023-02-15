import { IAuthUser } from 'src/commons/interfaces/context';
import { PassengerInput } from '../dto/passenger.input';
import { PAYMENT_STATUS_ENUM } from '../entities/payment.entity';

export interface IPaymentsServiceCreate {
  impUid: string;
  ticketId: string;
  amount: number;
  passengerInput: PassengerInput;
  user: IAuthUser['user'];
}

export interface IPaymentsVerifyAmount {
  amount: number;
  imp_payment: number;
}

export interface IPaymentsVerifyDuplication {
  impUid: string;
}

export interface IPaymentsVerifyRefund {
  totalAmount: number | null;
  refundAmount: number;
}

export interface IPaymentsVerifyCancel {
  status: PAYMENT_STATUS_ENUM;
}
