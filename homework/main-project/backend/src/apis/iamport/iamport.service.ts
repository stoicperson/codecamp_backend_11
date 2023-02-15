import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IIamportServiceGetPaymentData } from './interfaces/iamport-service.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PaymentData } from 'src/commons/interfaces/payment-data';

@Injectable()
export class IamportService {
  constructor(private readonly httpService: HttpService) {}

  async getAccessToken(): Promise<string> {
    const getToken = this.httpService.post(
      'https://api.iamport.kr/users/getToken',
      {
        imp_key: process.env.IMP_KEY,
        imp_secret: process.env.IMP_SECRET,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const { access_token } = (await lastValueFrom(getToken)).data.response;

    return access_token;
  }

  async getPaymentData({
    impUid,
  }: IIamportServiceGetPaymentData): Promise<PaymentData> {
    try {
      const access_token = await this.getAccessToken();

      const getPaymentData = this.httpService.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: { Authorization: access_token },
        },
      );
      const paymentData = (await lastValueFrom(getPaymentData)).data.response;

      return paymentData;
    } catch (e) {
      if (e.response.data.code === -1) {
        throw new UnprocessableEntityException('유효하지 않는 결제정보입니다.');
      }
    }
  }

  async refund({ impUid, totalAmount, refundAmount }) {
    try {
      const access_token = await this.getAccessToken();

      const getCancelData = await this.httpService.post(
        'https://api.iamport.kr/payments/cancel',
        {
          imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
          amount: refundAmount, // 가맹점 클라이언트로부터 받은 환불금액
          checksum: totalAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: access_token, // 포트원 서버로부터 발급받은 엑세스 토큰
          },
        },
      );
      const res = (await lastValueFrom(getCancelData)).data;

      if (!res.response) {
        throw new UnprocessableEntityException(res.message);
      }
      return res.response;
    } catch (error) {
      return error;
    }
  }
}
