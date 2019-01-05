"use strict";

/** global: puzzle */

const cli = require("cli");

const PUse = require("../core/PUse");
const CLIBase = require("./CLIBase");
const InvalidInstanceType = require("../exceptions/InvalidInstanceType");

/**
 * Commands loader - used for CLI
 *
 * @alias puzzle.commands
 * @memberOf cli
 * @extends core.PUse
 */
class CommandLoader extends PUse {
  /**
   * Constructor for Command Loader.
   */
  constructor() {
    super();

    /**
     * A map with all available commands.
     *
     * @property {object<string,CLIBase>}
     * @protected
     */
    this._commands = {};
  }

  /**
   * Called by engine when .use method is used.
   *
   * @param {PEngine} engine The reference to engine class.
   */
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
   *
   * @throws InvalidInstanceType
   */
  register(commandName, commandInstance) {
    if (!(commandInstance.prototype instanceof CLIBase)) {
      throw new InvalidInstanceType("CLIBase");
    }
    this._commands[commandName] = commandInstance;
  }

  /**
   * Enables the ability to run CLI commands.
   */
  async run() {
    puzzle.cli.setApp(puzzle.app.name, puzzle.app.version);

    puzzle.cli.parse(
      {
        usage: [false, "Display help and usage information"]
      },
      this.isValid(this._commands) ? Object.keys(this._commands) : []
    );
    const { command } = puzzle.cli;
    const isUsage = !!puzzle.cli.options.usage;

    if (!this.isValid(this._commands)
      || Object.keys(this._commands)
        .indexOf(command) < 0) {
      puzzle.cli.getUsage(0);
      if (!isUsage) {
        puzzle.cli.fatal("Unable to find the given command!");
      }
      return;
    }

    const commandInst = new this._commands[command]();
    puzzle.cli.parse(commandInst.options);
    const { options, args } = puzzle.cli;

    if (isUsage) {
      await commandInst.usage(args, options);
    } else {
      await commandInst.run(args, options);
    }
  }
}

module.exports = CommandLoader;
