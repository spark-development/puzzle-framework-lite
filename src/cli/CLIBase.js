"use strict";

const PObject = require("../base/PObject");

/**
 * The base of the CLI Commands.
 *
 * Using this Base class you can define commands that can be ran from the command line.
 *
 * @extends base.PObject
 * @memberOf cli
 * @abstract
 */
class CLIBase extends PObject {
  /**
   * Constructor of the CLI Command.
   *
   * @param {engine} engine The global reference to the engine.
   * @param {string} name The name of the command.
   */
  constructor(engine, name) {
    super(engine);

    /**
     * A reference to the CLI object.
     *
     * @member {cli}
     */
    this.cli = engine.cli;

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
  run(args, options) {

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
        const render = this.__(...msg);
        this.log.debug(render);
        cli.debug(render);
      },
      /**
       * Prints an information message.
       *
       * @param {string} msg The message to be printed.
       */
      info: (...msg) => {
        const render = this.__(...msg);
        this.log.info(render);
        cli.info(render);
      },
      /**
       * Prints an error message.
       *
       * @param {string} msg The message to be printed.
       */
      error: (...msg) => {
        const render = this.__(...msg);
        this.log.error(render);
        cli.error(render);
      },
      /**
       * Prints a fatal error message.
       *
       * @param {string} msg The message to be printed.
       */
      fatal: (...msg) => {
        const render = this.__(...msg);
        this.log.critical(render);
        cli.fatal(render);
      },
      /**
       * Prints an ok message.
       *
       * @param {string} msg The message to be printed.
       */
      ok: (...msg) => {
        const render = this.__(...msg);
        this.log.info(render);
        cli.ok(render);
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
        this.log.debug(msg);
        cli.debug(msg);
      },
      /**
       * Prints an information message.
       *
       * @param {string} msg The message to be printed.
       */
      info: (msg) => {
        this.log.info(msg);
        cli.info(msg);
      },
      /**
       * Prints an error message.
       *
       * @param {string} msg The message to be printed.
       */
      error: (msg) => {
        this.log.error(msg);
        cli.error(msg);
      },
      /**
       * Prints a fatal error message.
       *
       * @param {string} msg The message to be printed.
       */
      fatal: (msg) => {
        this.log.critical(msg);
        cli.fatal(msg);
      },
      /**
       * Prints an ok message.
       *
       * @param {string} msg The message to be printed.
       */
      ok: (msg) => {
        this.log.info(msg);
        cli.ok(msg);
      }
    };
  }
}

module.exports = CLIBase;
