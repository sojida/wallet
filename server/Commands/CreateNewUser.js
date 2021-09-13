/* eslint-disable class-methods-use-this */
const Yup = require('yup');
const Models = require('../Models');
const Db = require('../Dummy_Database');
const { CommandHandler } = require('../CQ');
const EventStore = require('../EventStore');
const Constants = require('../Constants');

class CreateNewUser extends CommandHandler {
  async handle(command) {
    const { username, email, password } = command.params;

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const validationErr = await schema.validate(command.params).catch((err) => err);

    if (validationErr.errors) {
      return {
        status: false,
        statusCode: 400,
        message: 'Validation Error',
        errors: {
          [validationErr.path]: validationErr.errors,
        },
      };
    }

    const user = new Models.User(username, password, email);

    // write operation
    Db.users.push(user);

    const wallet = new Models.Wallet(user.id);

    EventStore.appendEvent({
      aggregateId: wallet.id,
      state: wallet,
      type: Constants.WalletEvents.WALLET_CREATED,
    }).publishTo('wallet');

    return {
      status: true,
      statusCode: 200,
      message: 'User created successfully',
      user,
    };
  }
}

module.exports = CreateNewUser;
