const Transport = require('./Transport');

class Ship extends Transport {
  constructor(nickname, speed, isIntercontinental) {
    super(nickname, speed);
    this.isIntercontinental = isIntercontinental;
  }

  travelToContinent(continent) {
    if (!this.isIntercontinental)
      return console.log(
        `${this.nickname} cannot travel through continents. He's too weak, maaan...`
      );

    console.log(`${this.nickname} is travelling to ${continent}...`);
  }
}

module.exports = Ship;
