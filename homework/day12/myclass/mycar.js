class Car {
  constructor(kind = "차", power = 100, color = "검정", speed = 0) {
    this.kind = kind
    this.power = power
    this.color = color
    this.speed = speed
  }
  start = () => {
    console.log("출발~!")
  }
  stop = () => {
    console.log("정지!!!")
  }
  accelerate = () => {
    this.speed += 100
    console.log(this.speed)
  }
}

const 모닝 = new Car('모닝', 87, '황금')