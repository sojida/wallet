class Publish {
  constructor(channels, event) {
    this.channels = channels;
    this.event = event;
  }

  publishTo(channel) {
    const ch = this.channels[channel];

    if (ch) {
      ch.fns.forEach((fn) => fn(this.event));
    }
  }
}

module.exports = Publish;
