// class Date {
//   qqq = 3

//   getFullYear() {

//   }
//   getMonth() {

//   }
// }


const date = new Date()

console.log(date.getFullYear())
console.log(date.getMonth() + 1)

class Monster {
  constructor(power) {
    this.power = power
  }
  power = 10
  attack = () => {
    console.log("공격하자!!")
    console.log("내 공격력은 " + this.power + "야!!!")
  }

  run() {
    console.log("도망가자")
  }

}

const mymonster1 = new Monster()
mymonster1.attack()
mymonster1.run()

const mymonster2 = new Monster()
mymonster2.attack()
mymonster2.run()