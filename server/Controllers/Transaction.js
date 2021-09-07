const { CommandQueryApp } = require('../CQ');
const CreateTransaction = require('../Commands/CreateTransaction');

const createTransaction = async (req, res) => {
  const { receiverId, amount, description } = req.body;
  const { userId } = req.params;

  const command = CommandQueryApp.createCommand({
    amount, description, userId, receiverId,
  });
  const response = await CommandQueryApp.execute(CreateTransaction, command);

  return res.status(response.statusCode).json(response);
};

module.exports = { createTransaction };
