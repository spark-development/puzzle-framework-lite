"use strict";

const cli = require("cli");

const PUse = require("../core/PUse");

/**
 * Commands loader - used for CLI
 *
 * @alias engine.commands
 * @memberOf cli
 * @extends core.PUse
 */
class CommandLoader extends PUse {
  constructor() {
    super();

    this._commands = {};
  }

  use(engine) {
    engine.set("cli", cli);
    engine.set("commands", this);
    cli.enable("version", "status");
    cli.setApp(engine.app.name, engine.app.version);
  }

  /**
   * Register commands that can be called by the CLI Framework.
   *
   * @param {string} commandName The name of the command.
   * @param {*} commandInstance The object that performs the actions for the given command.
   */
  register(commandName, commandInstance) {
    this._commands[commandName] = commandInstance;
  }

  /**
   * Enables the ability to run CLI commands.
   */
  run() {
    cli.parse();
    const command = cli.args.shift();

    if (!this.isValid(this._commands) || Object.keys(this._commands).indexOf(command) < 0) {
      cli.fatal("Unable to find the given command!");
      return;
    }

    const commandInst = new this._commands[command]();
    cli.parse(commandInst.options);

    commandInst.run(cli.args, cli.options);
  }
}

module.exports = CommandLoader;
