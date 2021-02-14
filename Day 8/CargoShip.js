const Ship = require('./Ship');

class CargoShip extends Ship {
  constructor(nickname, speed, isIntercontinental, cargoCapacity) {
    super(nickname, speed, isIntercontinental);
    this.cargoCapacity = cargoCapacity;
  }

  transportCargo(cargo, from, to) {
    if (cargo > this.cargoCapacity)
      return console.log(
        `${this.nickname} cannot handle that much weight. Only ${this.cargoCapacity}, take it or leave it.`
      );

    console.log(
      `${this.nickname} transported ${cargo} pounds of cargo from ${from} to ${to}. ${to} is now hella riiiich!!!`
    );
  }
}
