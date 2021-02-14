const Car = require('./Car');

class FlyingCar extends Car {
  constructor(nickname, speed, model, price, yearOfRelease) {
    super(nickname, speed, model, price, yearOfRelease);
    this.isOnGround = true;
  }

  fly() {
    this.isOnGround = false;
    console.log(
      `${this.nickname} is flying with ${this.speed} miles per hour.`
    );
  }

  flyMeToTheMoon() {
    this.fly();

    console.log('Fly me to the moooon, let me plaaay among the staaars...');
  }

  ground() {
    this.isOnGround = true;

    console.log(`${this.nickname} is on the ground.`);
  }
}
