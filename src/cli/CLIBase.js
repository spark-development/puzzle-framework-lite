"use strict";

const PObject = require("../core/PObject");

/**
 * The base of the CLI Commands.
 *
 * Using this Base class you can define commands that can be ran from the command line.
 *
 * @extends core.PObject
 * @memberOf cli
 * @abstract
 */
class CLIBase extends PObject {
  /**
   * Constructor of the CLI Command.
   *
   * @param {string} name The name of the command.
   */
  constructor(name) {
    super();

    /**
     * A reference to the CLI object.
     *
     * @member {cli}
     */
    this.cli = puzzle.cli;

    /**
     * The name of the command, like: db:migrate, db:seed and so on.
     *
     * @member {string}
     */
    this.name = name;

    /**
     * Options passed to the command line
     *
     * @member {Object<string, Array>}
     */
    this.options = {};
  }

  /**
   * Runs the command.
   *
   * @abstract
   * @param {string[]} args The command line arguments
   * @param {Object} options The options given to the command.
   */
  async run(args, options) {

  }

  /**
   * Exit the command with the given code.
   *
   * @param {integer} errCode The error code to be returned to cli system.
   */
  done(errCode) {
    process.exit(errCode || 0);
  }

  /**
   * Puts a message in both log and screen for CLI commands.
   *
   * @type {Object}
   */
  get put() {
    const { cli } = this;
    return {
      /**
       * Prints a debug message.
       *
       * @param {string} msg The message to be printed.
       */
      debug: (...msg) => {
        cli.debug(puzzle.i18n.__(...msg));
      },
      /**
       * Prints an information message.
       *
       * @param {string} msg The message to be printed.
       */
      info: (...msg) => {
        cli.info(puzzle.i18n.__(...msg));
      },
      /**
       * Prints an error message.
       *
       * @param {string} msg The message to be printed.
       */
      error: (...msg) => {
        cli.error(puzzle.i18n.__(...msg));
      },
      /**
       * Prints a fatal error message.
       *
       * @param {string} msg The message to be printed.
       */
      fatal: (...msg) => {
        cli.fatal(puzzle.i18n.__(...msg));
      },
      /**
       * Prints an ok message.
       *
       * @param {string} msg The message to be printed.
       */
      ok: (...msg) => {
        cli.ok(puzzle.i18n.__(...msg));
      }
    };
  }

  /**
   * Puts an untranslated message in both log and screen for CLI commands.
   *
   * @type {Object}
   */
  get putU() {
    const { cli } = this;
    return {
      /**
       * Prints a debug message.
       *
       * @param {string} msg The message to be printed.
       */
      debug: (msg) => {
        cli.debug(msg);
      },
      /**
       * Prints an information message.
       *
       * @param {string} msg The message to be printed.
       */
      info: (msg) => {
        cli.info(msg);
      },
      /**
       * Prints an error message.
       *
       * @param {string} msg The message to be printed.
       */
      error: (msg) => {
        cli.error(msg);
      },
      /**
       * Prints a fatal error message.
       *
       * @param {string} msg The message to be printed.
       */
      fatal: (msg) => {
        cli.fatal(msg);
      },
      /**
       * Prints an ok message.
       *
       * @param {string} msg The message to be printed.
       */
      ok: (msg) => {
        cli.ok(msg);
      }
    };
  }
}

module.exports = CLIBase;
