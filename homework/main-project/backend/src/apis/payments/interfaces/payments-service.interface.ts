import { IAuthUser } from 'src/commons/interfaces/context';
import { PassengerInput } from '../dto/passenger.input';

export interface IPaymentsServiceCreate {
  impUid: string;
  ticketId: string;
  amount: number;
  passengerInput: PassengerInput;
  user: IAuthUser['user'];
}
