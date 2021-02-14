class Transport {
  constructor(nickname, speed) {
    this.nickname = nickname;
    this.speed = speed;
  }

  travel() {
    console.log(`${this.nickname} is travelling at ${this.speed} miles per hour... * whistles *`);
  }

  tune() {
    this.speed += 10;
    console.log(`${this.nickname} is being tuned. Damn it's gonna look cool!`);
  }
}

module.exports = Transport;