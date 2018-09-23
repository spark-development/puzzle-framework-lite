"use strict";

/** global: puzzle */

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
     * @alias puzzle.http
     */
    engine.set("http", express());
    /**
     * HTTP Server.
     *
     * @type {http.Server}
     * @alias puzzle.server
     */
    engine.set("server", http.Server(engine.http));

    puzzle.modules.register("http", this);
  }

  /**
   * Middleware loading.
   */
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
    const {
      http: app, config, server
    } = puzzle;
    const version = puzzle.appVersion || puzzle.version;
    const { views } = config;

    server.listen(config.http.port, config.http.listen);
    puzzle.log.info("%s [v%s]", config.engine.name || "Spark Puzzle Framework Lite", version.version);
    puzzle.log.info("-".repeat(30));
    puzzle.log.info("Listening on: %s:%d", config.http.listen, config.http.port);
    puzzle.log.info("-".repeat(30));

    app.use((err, req, res, next) => {
      puzzle.log.error(req.path);
      puzzle.log.error(err.stack);

      let statusCode = err.status || 500;
      switch (err.name) {
        case "ValidationError":
          statusCode = 400;
          break;
      }

      let errorCode = 500;
      switch (statusCode) {
        case 403:
          errorCode = 403;
          break;
        case 404:
          errorCode = 404;
          break;
      }

      const error = {
        status: "error",
        type: err.name,
        message: err.message
      };

      res.statusCode = statusCode;
      if (req.get("Content-Type") === "application/json"
        || !this.isValid(views.errorPages[errorCode])) {
        res.json(error);
        return;
      }

      res.render(views.errorPages[errorCode], error);
    });

    puzzle.log.info("HTTP Module is UP and Running!");
  }

  /**
   * After HTTP server has started.
   */
  afterOnline() {
    puzzle.http.use("*", (req, res, next) => {
      const err = new Error("Not Found");
      err.status = 404;
      next(err);
    });
  }
}

module.exports = HTTP;
