import { CashService } from './service/cash.service.js'

export class CouponController {
  cashService
  constructor(cashService, pointService) {
    this.cashService = cashService
    this.pointService = pointService
  }
  buyCoupon = (req, res) => {
    //1. 가진돈 검증하는 코드
    // const cashService = new CashService()
    const hasMoney = this.cashService.checkValue()

    //2. 사움권 구매하는 코드
    if (hasMoney) {
      res.send("상품 구매 완료")
    }
  }
}