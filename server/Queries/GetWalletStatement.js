/* eslint-disable class-methods-use-this */
const { QueryHandler } = require('../CQ');
const Db = require('../Dummy_Database');

class GetWalletStatement extends QueryHandler {
  query(query) {
    const { userId } = query.params;

    const wallet = Db.wallets.find(((walletItem) => walletItem.userId === userId));

    if (!wallet) {
      return {
        status: false,
        statusCode: 404,
        message: 'wallet not found',
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'transactions retrieved successfully',
      transactions: Db.transactions.filter((trx) => trx.walletId === wallet.id),
    };
  }
}

module.exports = GetWalletStatement;
