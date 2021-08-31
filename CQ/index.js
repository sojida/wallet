const CQ = require('./Cq');
const CommandHandler = require('./CommandHandler');
const QueryHandler = require('./QueryHandler');

const CommandQueryApp = new CQ();

module.exports = {
  CommandQueryApp,
  CommandHandler,
  QueryHandler,
};
