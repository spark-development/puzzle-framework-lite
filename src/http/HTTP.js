"use strict";

const express = require("express");
const http = require("http");

const PRuntime = require("../core/PRuntime");
const BodyParser = require("../middleware/BodyParser");
const CookieParser = require("../middleware/CookieParser");
const CORS = require("../middleware/CORS");
const ResponseHelper = require("../middleware/ResponseHelper");
const Session = require("../middleware/Session");
const i18n = require("../middleware/i18n");

/**
 * Runtime that loads the HTTP server.
 *
 * @extends core.PRuntime
 * @memberOf http
 */
class HTTP extends PRuntime {
  /**
   * Creates and initializes the HTTP server.
   *
   * @param {PEngine} engine The engine runtime.
   */
  use(engine) {
    /**
     * Express instance.
     *
     * @type {express}
     * @alias engine.http
     */
    engine.set("http", express());
    /**
     * HTTP Server.
     *
     * @type {http.Server}
     * @alias engine.server
     */
    engine.set("server", http.Server(engine.http));

    puzzle.modules.register("http", this);
  }

  boot() {
    super.boot();

    BodyParser();
    CookieParser();
    puzzle.use(i18n);
    CORS();
    ResponseHelper();
    Session();
  }

  /**
   * HTTP server starting.
   */
  online() {
    super.online();
    const { http: app, config, server } = puzzle;
    const version = puzzle.appVersion || puzzle.version;

    server.listen(config.http.port, config.http.listen);
    puzzle.log.info("%s [v%s]", config.engine.name || "Spark Puzzle Framework Lite", version.version);
    puzzle.log.info("-".repeat(30));
    puzzle.log.info("Listening on: %s:%d", config.http.listen, config.http.port);
    puzzle.log.info("-".repeat(30));

    app.use("*", (req, res, next) => {
      const err = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    app.use((err, req, res, next) => {
      puzzle.log.error(req.path);
      puzzle.log.error(err.stack);

      let statusCode = err.status || 500;
      switch (err.name) {
        case "ValidationError":
          statusCode = 400;
          break;
      }

      res.status(statusCode || 500).json({
        status: "error",
        type: err.name,
        message: err.message
      });
    });

    puzzle.log.info("HTTP Module is UP and Running!");
  }
}

module.exports = HTTP;
