class Event {
  constructor(aggregateId, state, type) {
    this.state = state;
    this.aggregateId = aggregateId;
    this.type = type;
  }
}

module.exports = Event;
