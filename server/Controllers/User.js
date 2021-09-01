const { CommandQueryApp } = require('../CQ');
const CreateNewUserCommand = require('../Commands/CreateNewUser');
const GetUserQuery = require('../Queries/GetUser');
const UpdateUserCommand = require('../Commands/UpdateUser');
const GetUserWalletQuery = require('../Queries/GetUserWallet');

const CreateUser = async (req, res) => {
  const { username, email, password } = req.body;

  const command = CommandQueryApp.createCommand({ username, email, password });
  const response = await CommandQueryApp.execute(CreateNewUserCommand, command);

  return res.status(response.statusCode).json(response);
};

const GetUser = async (req, res) => {
  const { id } = req.params;

  const query = CommandQueryApp.createQuery({ id });
  const response = await CommandQueryApp.query(GetUserQuery, query);

  return res.status(response.statusCode).json(response);
};

const UpdateUser = async (req, res) => {
  const { address, city, bvn } = req.body;
  const { id } = req.params;

  const command = CommandQueryApp.createCommand({
    address, city, bvn, id,
  });
  const response = await CommandQueryApp.execute(UpdateUserCommand, command);

  return res.status(response.statusCode).json(response);
};

const GetUserWallet = async (req, res) => {
  const { id } = req.params;

  const query = CommandQueryApp.createQuery({ id });
  const response = await CommandQueryApp.query(GetUserWalletQuery, query);

  return res.status(response.statusCode).json(response);
};

module.exports = {
  CreateUser,
  UpdateUser,
  GetUser,
  GetUserWallet,
};
