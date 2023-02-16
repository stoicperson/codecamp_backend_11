export interface IIamportServiceGetPaymentData {
  impUid: string;
}
export interface IIamportServiceRefund {
  impUid: string;
  totalAmount: number;
  refundAmount: number;
}
