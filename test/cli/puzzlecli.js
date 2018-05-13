"use strict";

const puzzleCli = {
  app: {
    name: "CLI Test App",
    version: "0.0.0"
  },
  _modules: {},
  set(module, instance) {
    this._modules[module] = instance;
  },
  env: "test",
  i18n: {
    __: (...msg) => `TRANSLATED: ${msg.join(' ')}`
  },
  log: {
    error(msg) {
      puzzleCli.cli.error(msg);
    }
  },
  cli: {
    args: [],
    options: {},
    parse(options) {
      this.args = this.returnArgs();
      this.options = options || {};
    },
    returnArgs() {
      return this.command ? [this.command, 123] : ['test', 123];
    },
    messages: [],
    shouldExit: false,
    exitCode: 0,
    _push(type, msg) {
      this.messages.push(`[${type.toLowerCase()}] ${msg}`)
    },
    debug(msg) {
      return this._push("debug", msg)
    },
    info(msg) {
      return this._push("info", msg)
    },
    error(msg) {
      return this._push("error", msg)
    },
    fatal(msg) {
      return this._push("fatal", msg)
    },
    ok(msg) {
      return this._push("ok", msg)
    }
  },
};

module.exports = puzzleCli;
