/* eslint-disable class-methods-use-this */
const { QueryHandler } = require('../CQ');
const Db = require('../Dummy_Database');

class GetUser extends QueryHandler {
  query(query) {
    const { id } = query.params;

    if (!id) {
      return {
        status: false,
        statusCode: 400,
        message: 'No Params',
      };
    }

    const user = Db.users.find((item) => item.id === id);

    if (!user) {
      return {
        status: false,
        message: 'user not found',
        statusCode: 404,
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'user retrieved successfully',
      user,
    };
  }
}

module.exports = GetUser;
