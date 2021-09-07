const { CommandQueryApp } = require('../CQ');
const CreateTransaction = require('../Commands/CreateTransaction');

const createTransaction = async (req, res) => {
  const { amount, description } = req.body;
  const { userId } = req.params;

  const command = CommandQueryApp.createCommand({ amount, description, userId });
  const response = await CommandQueryApp.execute(CreateTransaction, command);

  return res.status(response.statusCode).json(response);
};

module.exports = { createTransaction };
