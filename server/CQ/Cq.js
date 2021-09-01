/* eslint-disable class-methods-use-this */
const Command = require('./Command');
const Query = require('./Query');

class Runner {
  execute(CommandHandler, command) {
    const commandHandler = new CommandHandler();
    return commandHandler.handle(command);
  }

  query(QueryHandler, query) {
    const queryHandler = new QueryHandler();
    return queryHandler.query(query);
  }

  createCommand(params) {
    return new Command(params);
  }

  createQuery(params) {
    return new Query(params);
  }
}

module.exports = Runner;
