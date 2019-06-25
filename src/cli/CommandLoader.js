"use strict";

/** global: puzzle */

const _ = require("lodash");
const cli = require("cli");
const fs = require("fs");
const path = require("path");

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
   * @param {*} commandName The name of the command.
   * @param {*} commandInstance The object that performs the actions for the given command.
   *
   * @throws InvalidInstanceType
   */
  register(commandName, commandInstance = null) {
    if (_.isObject(commandName) && typeof commandName !== "string") {
      commandInstance = commandName;
      commandName = "";
    }

    if (!(commandInstance.prototype instanceof CLIBase)) {
      throw new InvalidInstanceType("CLIBase");
    }

    if (commandName === "") {
      commandName = (new commandInstance()).name;
    }

    this._commands[commandName] = commandInstance;
  }

  /**
   * Register an API routes folder into the engine.
   *
   * @param {string} root The root folder of the module.
   * @param {string} [routes=routes] The name of the routes folder.
   */
  load(root, routes = "commands") {
    const fullPath = path.join(root, routes);
    fs.readdirSync(fullPath).forEach((file) => {
      if (path.extname(file) !== ".js") {
        return;
      }

      const ClassPath = require(path.resolve(fullPath, file));
      if (!this.isValid(ClassPath) || !_.isFunction(ClassPath)) {
        return;
      }

      this.register(ClassPath);
    });
  }

  /**
   * Enables the ability to run CLI commands.
   */
  async run() {
    puzzle.cli.setApp(puzzle.app.name, puzzle.app.version);

    puzzle.cli.parse(
      null,
      this.isValid(this._commands) ? Object.keys(this._commands) : []
    );
    const { command } = puzzle.cli;
    const isUsage = !!puzzle.cli.options.usage;

    if (!this.isValid(this._commands)
      || Object.keys(this._commands).indexOf(command) < 0) {
      puzzle.cli.fatal("Unable to find the given command!");
      return;
    }

    const commandInst = new this._commands[command]();
    puzzle.cli.parse(
      Object.assign(
        {
          usage: [false, "Display help and usage information"]
        },
        commandInst.options
      )
    );
    const { options, args } = puzzle.cli;
    if (isUsage) {
      await commandInst.usage(args, options);
    } else {
      await commandInst.run(args, options);
    }
  }
}

module.exports = CommandLoader;
