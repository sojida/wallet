const Db = require('../Dummy_Database');
const Models = require('../Models');
const { WalletEvents } = require('../Constants/Events');

const handleWalletBalanceUpdate = (event) => {
  const walletInStore = Db.wallets.find(((walletItem) => walletItem.id === event.aggregateId));
  walletInStore.balance += Number(event.state.amount);
};

const handleWalletCreate = (event) => {
  const newWallet = new Models.Wallet(event.state.userId);
  newWallet.balance = Number(event.state.balance);
  newWallet.id = event.state.id;

  Db.wallets.push(newWallet);
};

const handle = (event) => {
  switch (event.type) {
    case WalletEvents.WALLET_CREATED:
      handleWalletCreate(event);
      break;
    case WalletEvents.WALLET_BALANCE_UPDATED:
      handleWalletBalanceUpdate(event);
      break;
    default:
      console.log('invalid event for wallet', event);
  }
};

module.exports = handle;
