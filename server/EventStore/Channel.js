class Channel {
  constructor() {
    this.fns = [];
  }

  onEvent(fn) {
    this.fns.push(fn);
  }
}

module.exports = Channel;
