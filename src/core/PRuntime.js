"use strict";

const PObject = require("./PObject");

/**
 * Runtime class to be used in the framework.
 *
 * Using this class, you will be able to add functionalities in the various stages where
 * the framework will be at various points in its execution.
 *
 * This class is an abstract class. You have to extend it in order to use it.
 *
 * The lifecycle of the framework is: start -> BOOT -> SERVER_ONLINE(online) -> SHUTDOWN -> stop
 *
 * @memberOf core
 * @extends core.PObject
 * @abstract
 */
class PRuntime extends PObject {
  /**
   * Constructor for the Runtime class.
   */
  constructor() {
    super();
    /**
     * Should this runtime be ran only in HTTP environment?
     *
     * @property {boolean}
     * @protected
     */
    this._httpOnly = false;
    /**
     * Should this runtime be ran only in CLI environment?
     *
     * @property {boolean}
     * @protected
     */
    this._cliOnly = false;
  }

  /**
   * Should this runtime be ran only in HTTP environment?
   *
   * @return {boolean}
   */
  get httpOnly() {
    return this._httpOnly;
  }

  /**
   * Should this runtime be ran only in CLI environment?
   *
   * @return {boolean}
   */
  get cliOnly() {
    return this._cliOnly;
  }

  /**
   * The code that executes before the Boot status is achieved.
   */
  beforeBoot() {

  }

  /**
   * The code that executes when the Boot status is achieved.
   */
  boot() {

  }

  /**
   * The code that executes after the Boot status is achieved.
   */
  afterBoot() {

  }

  /**
   * The code that executes before the Server Online status is achieved.
   */
  beforeOnline() {

  }

  /**
   * The code that executes when the Server Online status is achieved.
   */
  online() {

  }

  /**
   * The code that executes after the Server Online status is achieved.
   */
  afterOnline() {

  }

  /**
   * The code that executes before the Shutdown status is achieved.
   */
  beforeShutdown() {

  }

  /**
   * The code that executes when the Shutdown status is achieved.
   */
  shutdown() {

  }

  /**
   * The code that executes after the Shutdown status is achieved.
   */
  afterShutdown() {

  }
}

module.exports = PRuntime;
