import { IAuthUser } from 'src/commons/interfaces/context';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from '../entities/pointTransaction.entity';

export interface IPointsTransactionsServiceFindOneByImpUid {
  impUid: string;
}

export interface IPointsTransactionsServiceCheckDuplication {
  impUid: string;
}

export interface IPointsTransactionsServiceCreateForPayment {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceFindByImpUidAndUserId {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceCancel {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceChacekAlreadyCanceled {
  pointTransactions: PointTransaction[];
}

export interface IPointsTransactionsServiceCheckHasCancelablePoint {
  pointTransactions: PointTransaction[];
}

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  status?: POINT_TRANSACTION_STATUS_ENUM;
  user: IAuthUser['user'];
}
