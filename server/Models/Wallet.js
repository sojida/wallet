const randomstring = require('randomstring');

class Wallet {
  constructor(userId) {
    this.id = randomstring.generate({ length: 5 });
    this.balance = 100000;
    this.userId = userId;
  }
}

module.exports = Wallet;
