/* eslint-disable class-methods-use-this */
const Yup = require('yup');
const Db = require('../Dummy_Database');
const Models = require('../Models');
const { CommandHandler } = require('../CQ');
const WalletProjection = require('../Projections/Wallet');
const EventStore = require('../EventStore');

class CreateTransaction extends CommandHandler {
  async handle(command) {
    const {
      amount, description, userId,
    } = command.params;

    const schema = Yup.object().shape({
      amount: Yup.number().required(),
      description: Yup.string().required(),
    });

    const validationErr = await schema.validate(command.params).catch((err) => err);

    if (validationErr.errors) {
      return {
        status: false,
        statusCode: 200,
        message: 'Validation Error',
        errors: {
          [validationErr.path]: validationErr.errors,
        },
      };
    }

    const user = Db.users.find(((usr) => usr.id === userId));

    if (!user) {
      return {
        status: false,
        statusCode: 404,
        message: 'user not found',
      };
    }

    if (user.state !== 'VERIFIED') {
      return {
        status: false,
        statusCode: 400,
        message: 'Please verify your account before you can do any transaction',
      };
    }

    const walletInStore = Db.wallets.find(((walletItem) => walletItem.userId === userId));

    if (!walletInStore) {
      return {
        status: false,
        statusCode: 404,
        message: 'wallet not found',
      };
    }

    const walletStream = EventStore.findEvent({ aggregateId: walletInStore.id });

    const wallet = new WalletProjection().build(walletStream);

    if (Number(wallet.balance) + Number(amount) < 0) {
      return {
        status: false,
        statusCode: 422,
        message: 'Insufficient funds',
      };
    }

    EventStore.appendEvent({ aggregateId: wallet.id, state: { amount: Number(amount) }, type: 'WALLET_BALANCE_UPDATED' })
      .publishTo('wallet');

    // create transaction
    const senderTrx = new Models.Transaction(amount, description, wallet.id);
    Db.transactions.push(senderTrx);

    return {
      status: true,
      statusCode: 200,
      message: 'Transaction successful',
      transaction: senderTrx,
    };
  }
}

module.exports = CreateTransaction;
