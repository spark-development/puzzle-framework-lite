"use strict";

const express = require("express");
const http = require("http");

const Runtime = require("../base/Runtime");

/**
 * Runtime that loads the HTTP server.
 *
 * @extends base.Runtime
 * @memberOf http
 */
class HTTP extends Runtime {
  /**
   * Creates and initializes the HTTP server.
   */
  init() {
    const { engine } = this;

    /**
     * Express instance.
     *
     * @memberOf engine
     * @type {express}
     */
    engine.app = express();
    /**
     * HTTP Server.
     *
     * @memberOf engine
     * @type {http.Server}
     */
    engine.server = http.Server(engine.app);
  }

  /**
   * Loads some base middlewares into the application engine.
   */
  middlewares() {
    const { engine } = this;
    engine.middlewares(require("../middleware/BodyParser"));
    engine.middlewares(require("../middleware/CookieParser"));
    engine.middlewares(require("../middleware/CORS"));
    engine.middlewares(require("../middleware/i18n"));
    engine.middlewares(require("../middleware/ResponseHelper"));
    engine.middlewares(require("../middleware/Session"));
  }

  /**
   * HTTP server starting.
   */
  run() {
    const { engine } = this;

    const { app, config, server } = engine;
    const version = engine.appVersion || engine.version;

    server.listen(config.http.port, config.http.listen);
    this.log.info("%s [v%s]", config.engine.name || "Spark Puzzle Framework", version.version);
    this.log.info("-".repeat(30));
    this.log.info("Listening on: %s:%d", config.http.listen, config.http.port);
    this.log.info("-".repeat(30));

    app.use("*", (req, res, next) => {
      const err = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    app.use((err, req, res, next) => {
      this.log.error(req.path);
      this.log.error(err.stack);

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

    this.log.info("HTTP Module is UP and Running!");
  }
}

module.exports = HTTP;
