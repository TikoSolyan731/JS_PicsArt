const Cruiser = require('./Cruiser');

class PrivateCruiser extends Cruiser {
  constructor(nickname, speed, isIntercontinental, peopleCapacity, owner) {
    super(nickname, speed, isIntercontinental, peopleCapacity);
    this.owner = owner;
  }

  startCruise(...places) {
    places.forEach(place => {
      console.log(`${this.owner} is currently enjoying his stay at ${place}.`);
    });
  }
}

module.exports = PrivateCruiser;