"use strict";

/**
 * Response helper function wrapper.
 *
 * @alias ResponseHelper
 * @memberOf middleware
 */
module.exports = () => {
  puzzle.http.use((req, res, next) => {
    /**
     * Returns an OK message to the API.
     *
     * @memberOf http.ServerResponse
     *
     * @param {string} message The message to be sent.
     *
     * @return http.ServerResponse
     */
    res.ok = function ok(message) {
      return res.json({
        status: "ok",
        message: res.__(message)
      });
    };

    /**
     * Returns an error to the API.
     *
     * @memberOf http.ServerResponse
     *
     * @param {string} type The type of the message.
     * @param {string} message The message to be sent.
     * @param {int} code The HTTP status code.
     *
     * @return http.ServerResponse
     */
    res.error = function error(type, message, code) {
      return res.status(code || 500).json({
        status: "error",
        type,
        message: res.__(message)
      });
    };

    /**
     * Throws an error to the API.
     *
     * @memberOf http.ServerResponse
     *
     * @param {Object} error The error thrown by the application.
     *
     * @return http.ServerResponse
     */
    res.throw = function throws(error) {
      const { name: errorType } = error.constructor;
      const { message: errorMessage } = error;
      const code = error.httpCode || 500;

      engine.log.error(errorMessage);
      engine.log.error(error.stack);

      return res.error(errorType, errorMessage, code);
    };

    next();
  });
};
