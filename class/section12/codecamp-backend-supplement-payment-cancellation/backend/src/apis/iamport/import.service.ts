import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';
import {
  IIamportServiceCancel,
  IIamportServiceCheckPaid,
} from './interfaces/iamport-service.interface';

@Injectable()
export class IamportService {
  async getToken(): Promise<string> {
    try {
      const result = await axios.post(`https://api.iamport.kr/users/getToken`, {
        imp_key: process.env.IMP_KEY,
        imp_secret: process.env.IMP_SECRET,
      });
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPaid({ impUid, amount }: IIamportServiceCheckPaid): Promise<void> {
    try {
      const token = await this.getToken();
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        { headers: { Authorization: token } },
      );
      if (amount !== result.data.response.amount)
        throw new UnprocessableEntityException('잘못된 결제 정보입니다.');
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async cancel({ impUid }: IIamportServiceCancel): Promise<number> {
    try {
      const token = await this.getToken();

      const result = await axios.post(
        'https://api.impoart.kr/payments/cancel',
        {
          imp_uid: impUid,
        },
        {
          headers: { Authorization: token },
        },
      );
      return result.data.response.cancel_amount;
    } catch (e) {
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }
}
