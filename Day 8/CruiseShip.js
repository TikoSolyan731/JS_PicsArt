const Ship = require('./Ship');

class CruiseShip extends Ship {
  constructor(nickname, speed, isIntercontinental, peopleCapacity) {
    super(nickname, speed, isIntercontinental);
    this.peopleCapacity = peopleCapacity;
  }

  startCruise(peopleCount, ...places) {
    if (peopleCount > this.peopleCapacity)
      return console.log(
        `${this.nickname} cannot handle that much people. Only ${this.peopleCapacity}, take it or leave it.`
      );

    places.forEach(place => {
      console.log(`${this.nickname} has arrived at ${place}. It's pretty cool`);
    });
  }
}

module.exports = CruiseShip;
