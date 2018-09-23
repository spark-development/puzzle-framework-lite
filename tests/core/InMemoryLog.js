"use strict";

const PLog = require("../../src/core/PLog");

class InMemoryLog extends PLog {
  constructor() {
    super();

    this._messages = [];

    this.logLevel = "test";
    this._logger = this;
  }

  get size() {
    return this._messages.length;
  }

  get text() {
    return this._messages;
  }

  _formatter(type, message) {
    this._messages.push(`[${type.toUpperCase()}] ${message}`);
  }

  debug(message) {
    this._formatter("debug", message);
  }

  info(message) {
    this._formatter("info", message);
  }

  error(message) {
    this._formatter("error", message);
  }
}

module.exports = InMemoryLog;
