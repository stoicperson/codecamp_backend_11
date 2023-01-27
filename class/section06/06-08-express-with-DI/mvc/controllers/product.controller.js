export class ProductController {
  constructor(cashService, productServe) {
    this.cashService = cashService
    this.productServe = productServe
  }
  buyProduct = (req, res) => {
    // 1. 가진 돈 검증하는 코드 (대략 10줄 정도)
    const hasMoney = this.cashService.checkValuse()

    // 2. 판매 여부를 검증하는 코드 (대략 10줄 정도)
    const isSoldout = this.productService.checkSoldout()

    // 3. 싱픔 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료!!")
    }
  }
  refundProduct = (req, res) => {
    // 1. 판매여부 검증하는 코드 (대략 10줄 정도)
    const isSoldout = this.productService.checkSoldout()

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send("상품 환불 완료!!")
    }
  }
}

