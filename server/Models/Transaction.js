const randomstring = require('randomstring');
const moment = require('moment');

class Transaction {
  constructor(amount, description, walletId) {
    this.id = randomstring.generate({ length: 5 });
    this.amount = amount;
    this.description = description;
    this.walletId = walletId;
    this.timestamp = moment().format('YYYY MM DD, h:mm:ss a');
  }
}

module.exports = Transaction;
