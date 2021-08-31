/* eslint-disable class-methods-use-this */
const Yup = require('yup');
const Db = require('../Dummy_Database');
const Models = require('../Models');
const { CommandHandler } = require('../CQ');

class CreateTransaction extends CommandHandler {
  async handle(command) {
    const {
      amount, description, walletId,
    } = command.params;

    const schema = Yup.object().shape({
      amount: Yup.number().required(),
      description: Yup.string().required(),
    });

    const validationErr = await schema.validate(command.params).catch((err) => err);

    if (validationErr.errors) {
      return {
        statusCode: 200,
        message: 'Validation Error',
        errors: {
          [validationErr.path]: validationErr.errors,
        },
      };
    }

    const wallet = Db.wallets.find(((walletItem) => walletItem.id === walletId));

    if (!wallet) {
      return {
        statusCode: 404,
        message: 'wallet not found',
      };
    }

    const newWalletBalance = Number(wallet.balance) + Number(amount);

    if (newWalletBalance < 0) {
      return {
        statusCode: 422,
        message: 'insufficient funds',
      };
    }

    const transaction = new Models.Transaction(amount, description);
    Db.transactions.push(transaction);

    wallet.balance = newWalletBalance;

    return {
      statusCode: 200,
      message: 'transaction created successfully',
      transaction,
    };
  }
}

module.exports = CreateTransaction;
