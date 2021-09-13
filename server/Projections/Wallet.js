/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const Models = require('../Models');
const { WalletEvents } = require('../Constants/Events');

class WalletProjection {
  build(streams) {
    const wallet = new Models.Wallet();

    for (let i = 0; i < streams.length; i += 1) {
      this._apply(streams[i], wallet);
    }

    return wallet;
  }

  _apply(event, wallet) {
    switch (event.type) {
      case WalletEvents.WALLET_CREATED:
        wallet.userId = event.state.userId;
        wallet.balance = event.state.balance;
        wallet.id = event.state.id;
        break;
      case WalletEvents.WALLET_BALANCE_UPDATED:
        wallet.balance += Number(event.state.amount);
        break;
      default:
        wallet = wallet;
    }
  }
}

module.exports = WalletProjection;
