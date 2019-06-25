"use strict";

/**
 * Default configuration values
 *
 * @type {Object}
 * @alias config
 * @memberOf engine
 */
module.exports = {
  /**
   * General engine configuration
   *
   * @type {Object}
   */
  engine: {
    /**
     * Is the application in debug mode? Overrides the log setting.
     *
     * @type {boolean}
     */
    debug: false,

    /**
     * Log configuration
     *
     * @type {Object}
     */
    log: {
      /**
       * Log level: emergency, alert, critical, error, warning, notice, info, debug
       *
       * @type {string}
       */
      level: "info",

      /**
       * Location of the log file.
       *
       * @type {string}
       */
      file: "",

      /**
       * Should the log be rotated?
       *
       * @type {boolean}
       */
      rotate: true,

      /**
       * Maximum log file size before rotation. Modifiers are: k(ilo), m(ega), g(iga)
       *
       * @type {string}
       */
      size: "50k",

      /**
       * How often to check for file rotation conditions. possible values are '1s', '1m', '1h'. default is 5m.
       *
       * @type {string}
       */
      schedule: "5m",

      /**
       * Should the rotated log be compressed?
       *
       * @type {boolean}
       */
      compress: false,

      /**
       * How many rotation files should exist.
       *
       * @type {int}
       */
      count: 3
    },

    /**
     * Configuration of the task runner.
     *
     * @type {Object}
     */
    runner: {
      /**
       * The location of the task runner logging folder.
       *
       * @type {string}
       */
      logs: "logs",

      /**
       * Timestamp used to identify the runner log file.
       *
       * @type {string}
       */
      timestamp: "YYYYMMDD",
    },

    /**
     * Name of the application.
     *
     * @type {string}
     */
    name: "Puzzle Framework"
  },

  /**
   * HTTP module configuration.
   *
   * @type {Object}
   */
  http: {
    /**
     * Specifies the port the application is listening to.
     *
     * @type {int}
     */
    port: 3000,

    /**
     * The address on which the server listens on.
     *
     * @type {string}
     */
    listen: "127.0.0.1",

    /**
     * The URL of the server, without the context path.
     *
     * @type {string}
     */
    serverURL: "http://localhost:3000",

    /**
     * The context path to build URLs in the application.
     *
     * @type {string}
     */
    contextPath: "",

    /**
     * Cross-Origin resource sharing variable. A list with the sites that are allowed to
     * access REST resources exposed by the application.
     *
     * @type {string}
     */
    cors: "*",

    /**
     * The base path of the API routes.
     *
     * @type {string}
     */
    APIPath: "/api/v1"
  },

  /**
   * Internationalization module configuration.
   *
   * @type {Object}
   */
  i18n: {
    /**
     * A list with all enabled languages.
     *
     * @type {string[]}
     */
    languages: ["en"],

    /**
     * The name of the cookie used to translate the application.
     *
     * @type {string}
     */
    cookie: "puzzle.i18n",

    /**
     * The default locale to be used by the application.
     *
     * @var {string}
     */
    defaultLocale: "en",

    /**
     * Folder where the internationalisation files will be created.
     *
     * @var {string}
     */
    locales: "locales"
  },

  /**
   * Session module configuration.
   *
   * @type {Object}
   */
  session: {
    /**
     * The secret used to encrypt the session cookie.
     *
     * @type {string}
     */
    secret: "qwertyuiop",

    /**
     * The secret used to encrypt the session cookie.
     *
     * @type {string}
     */
    store: "memory"
  },

  /**
   * View/ui module configuration.
   *
   * @type {Object}
   */
  views: {
    /**
     * Enables or disables the views functionality.
     *
     * @type {boolean}
     */
    enabled: true,

    /**
     * Folder where all views are stored.
     *
     * @type {string}
     */
    views: "views",

    /**
     * Folder where all layouts are stored.
     *
     * @type {string}
     */
    layouts: "views/layouts",

    /**
     * Folder where all partials are stored.
     *
     * @type {string}
     */
    partials: "views/partials",

    /**
     * Location of the default layout.
     *
     * @type {string}
     */
    defaultLayout: "views/layouts/main.hbs",

    /**
     * Folder where public static content is stored.
     *
     * @type {string}
     */
    publicContent: "public",

    /**
     * Error pages used to display various messages.
     *
     * @type {Object}
     */
    errorPages: {
      /**
       * Route not authorized error page.
       *
       * @type {string}
       */
      403: "errors/403",
      /**
       * Route not found error page.
       *
       * @type {string}
       */
      404: "errors/404",
      /**
       * Problems error page.
       *
       * @type {string}
       */
      500: "errors/500"
    }
  }
};
