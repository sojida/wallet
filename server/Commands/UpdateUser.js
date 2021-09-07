/* eslint-disable class-methods-use-this */
const Yup = require('yup');
const Db = require('../Dummy_Database');
const { CommandHandler } = require('../CQ');

class UpdateUser extends CommandHandler {
  async handle(command) {
    const {
      address, city, bvn, id,
    } = command.params;

    const schema = Yup.object().shape({
      address: Yup.string().optional().nullable(),
      city: Yup.string().optional().nullable(),
      bvn: Yup.string().optional().nullable(),
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

    const user = Db.users.find((item) => item.id === id);

    if (!user) {
      return {
        status: false,
        message: 'user not found',
        statusCode: 400,
      };
    }

    user.address = address || user.address;
    user.city = city || user.city;
    user.bvn = bvn || user.bvn;

    if (bvn) {
      user.state = 'VERIFIED';
    }

    return {
      status: true,
      statusCode: 200,
      message: 'user updated successfully',
      user,
    };
  }
}

module.exports = UpdateUser;
