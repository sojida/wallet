/* eslint-disable class-methods-use-this */
const { QueryHandler } = require('../CQ');
const Db = require('../Dummy_Database');

class GetUserWallet extends QueryHandler {
  query(query) {
    const { id } = query.params;

    if (!id) {
      return {
        statusCode: 400,
        message: 'No Params',
      };
    }

    const user = Db.users.find((item) => item.id === id);

    if (!user) {
      return {
        statusCode: 404,
        message: 'user not found',
      };
    }

    if (user.state !== 'VERIFIED') {
      return {
        statusCode: 403,
        message: 'user not verified',
      };
    }

    const wallet = Db.wallets.find(((walletItem) => walletItem.userId === user.id));

    return {
      statusCode: 200,
      message: 'user wallet retrieved successfully',
      wallet,
    };
  }
}

module.exports = GetUserWallet;
