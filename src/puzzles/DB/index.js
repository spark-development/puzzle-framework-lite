"use strict";

const Sequelize = require("sequelize");

const ToggleRuntime = require("../../base/ToggleRuntime");

/**
 * Database engine module.
 *
 * @namespace DB
 */

/**
 * Database engine main entry point.
 *
 * This functionality is disabled by default. To enable it, you must set the
 * puzzle.core.ui attribute in package.json to true.
 *
 * @extends base.ToggleRuntime
 * @memberOf DB
 */
class DBMain extends ToggleRuntime {
  constructor(engine) {
    super(engine, "db");
    this._enabled = false;
  }

  /**
   * Initializes the DB system.
   */
  init() {

  }

  /**
   * Performs some actions.
   */
  run() {
    const { engine } = this;
    engine.db = this.sequelize();

    engine.commands("db:migrate", require("./commands/Migrations"));
    engine.models.storage = require("./DBStorage");
  }

  /**
   * Initializes the sequelize library to be used by the framework.
   *
   * @protected
   * @return {Sequelize}
   */
  sequelize() {
    const { engine } = this;
    const dbConfig = engine.config.db[engine.env];

    return new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.driver,
      logging: (message) => {
        this.log.debug(message);
      }
    });
  }
}

module.exports = DBMain;
