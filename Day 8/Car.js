const Transport = require('./Transport');

class Car extends Transport {
  constructor(nickname, speed, model, price, yearOfRelease) {
    super(nickname, speed);
    this.model = model;
    this.price = price;
    this.yearOfRelease = yearOfRelease;
  }

  honk() {
    console.log('Pib Pib');
  }

  breakDown() {
    this.speed = 0;
    console.log(`Shit! ${this.nickname} broke down... God damnit!`);
  }

  crash(otherCar) {
    this.speed = 0;
    otherCar.speed = 0;

    this.price -= 5000;
    console.log(`Do we call APPA bro?`);
  }
}

module.exports = Car;