const Car = require('./Car');

class SuperCar extends Car {
  constructor(nickname, speed, model, price, yearOfRelease, winCount) {
    super(nickname, speed, model, price, yearOfRelease);
    this.winCount = winCount;
  }

  race(otherSuperCars) {
    const hasWon = this.speed / Math.floor(Math.random() * this.speed) <= 0.8;

    if (hasWon) {
      this.winCount++;
      console.log(`${this.nickname} has won the race. Yaaay!!!`);
      return;
    }

    otherSuperCars.forEach(superCar => {
      hasWon = this.speed / Math.floor(Math.random() * this.speed) <= 0.8;

      if (hasWon) {
        superCar.winCount++;
        console.log(`${superCar.nickname} has won the race. Yaaay!!!`);
        break;
      }
    });

    console.log(`Unfortunately noone won the race. Boooooring, booooo!!`);
  }
}

module.exports = SuperCar;