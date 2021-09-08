/* eslint-disable class-methods-use-this */
const Yup = require('yup');
const Db = require('../Dummy_Database');
const Models = require('../Models');
const { CommandHandler } = require('../CQ');

class CreateTransaction extends CommandHandler {
  async handle(command) {
    const {
      amount, description, userId, receiverId,
    } = command.params;

    const schema = Yup.object().shape({
      amount: Yup.number().required(),
      description: Yup.string().required(),
      receiverId: Yup.string().required(),
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

    const wallet = Db.wallets.find(((walletItem) => walletItem.userId === userId));

    if (!wallet) {
      return {
        status: false,
        statusCode: 404,
        message: 'wallet not found',
      };
    }

    const newWalletBalance = Number(wallet.balance) + Number(amount);

    if (newWalletBalance < 0) {
      return {
        status: false,
        statusCode: 422,
        message: 'Insufficient funds',
      };
    }

    const receiverWallet = Db.wallets.find((recWallet) => recWallet.userId === receiverId);

    if (!receiverWallet) {
      return {
        status: false,
        statusCode: 404,
        message: 'receiver does not exist',
      };
    }

    const senderTrx = new Models.Transaction(amount, description, wallet.id);
    const receiverTrx = new Models.Transaction(Math.abs(amount), description, receiverWallet.id);

    Db.transactions.push(senderTrx);
    Db.transactions.push(receiverTrx);

    receiverWallet.balance = Number(receiverWallet.balance) - Number(amount);
    wallet.balance = newWalletBalance;

    return {
      status: true,
      statusCode: 200,
      message: 'Transaction successful',
      transaction: senderTrx,
    };
  }
}

module.exports = CreateTransaction;
