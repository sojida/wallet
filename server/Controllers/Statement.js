const { CommandQueryApp } = require('../CQ');
const GetWalletStatement = require('../Queries/GetWalletStatement');

const getStatement = async (req, res) => {
  const { walletId } = req.params;

  const query = CommandQueryApp.createQuery({ walletId });

  const response = await CommandQueryApp.query(GetWalletStatement, query);

  return res.status(response.statusCode).json(response);
};

module.exports = { getStatement };
