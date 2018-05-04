"use strict";

module.exports = {
  http: {
    use(fn) {

    }
  },
  config: {
    http: {
      session: {
        store: 'memory',
        key: 'test',
        secret: 'secret.discret'
      }
    }
  }
};
