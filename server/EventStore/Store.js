const Event = require('./Event');
const Channel = require('./Channel');
const Publish = require('./Publish');

class Store {
  constructor() {
    this.channels = {};
    this.store = {};
  }

  findEvent({ aggregateId }) {
    return this.store[aggregateId];
  }

  appendEvent({
    aggregateId, state, type,
  }) {
    const event = new Event(aggregateId, state, type);
    if (this.store[aggregateId]) {
      this.store[aggregateId].push(event);
    } else {
      this.store[aggregateId] = [event];
    }

    return new Publish(this.channels, event);
  }

  subscribe(channel) {
    const newChannel = new Channel();
    this.channels[channel] = newChannel;
    return newChannel;
  }

  getSubscription(channel) {
    return this.channels[channel];
  }
}

module.exports = Store;
