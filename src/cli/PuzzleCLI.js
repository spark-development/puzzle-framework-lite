"use strict";

const Puzzle = require("../PuzzleOld");

/**
 * The entry point for CLI framework.
 *
 * This class is launched by the CLI engine.
 *
 * @extends Puzzle
 * @memberOf cli
 */
class PuzzleCLI extends Puzzle {
  /**
   * Initializes the CLI framework.
   */
  init() {
    super.init();
    const { engine } = this;

    /**
     * Holds the list of commands.
     *
     * @member {Object<string,Object>}
     */
    this.commands = {};

    /**
     * Register commands that can be called by the CLI Framework.
     *
     * @memberOf engine
     * @alias engine.commands
     *
     * @param {string} command The name of the command.
     * @param {Object} obj The object that performes the actions for the given command.
     */
    engine.commands = (command, obj) => {
      this.commands[command] = obj;
    };
  }

  /**
   * Enables the ability to run CLI commands.
   */
  run() {
    super.run();
    const { cli } = this.engine;
    cli.parse();

    const command = cli.args.shift();

    if (!this.isValid(this.commands) || Object.keys(this.commands).indexOf(command) < 0) {
      this.log.error("Unable to find the given command!");
      cli.fatal("Unable to find the given command!");
      return;
    }

    const commandInst = new this.commands[command](this.engine);
    cli.parse(commandInst.options);

    commandInst.run(cli.args, cli.options);
  }
}

module.exports = PuzzleCLI;
