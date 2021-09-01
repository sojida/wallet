const randomstring = require('randomstring');

class User {
  constructor(username, password, email) {
    this.id = randomstring.generate({ length: 5 });
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = null;
    this.city = null;
    this.bvn = null;
    this.state = 'UNVERIFIED';
  }
}

module.exports = User;
