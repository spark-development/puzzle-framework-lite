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
   * Database module configuration.
   *
   * @type {Object}
   */
  db: {
    /**
     * Location of the migrations.
     *
     * @var {string}
     */
    migrationsPath: "./db/migrations",

    /**
     * Location of the seeds.
     *
     * @var {string}
     */
    seedsPath: "./db/seeds",

    /**
     * @property {Object} local           Local instance of the DB connection.
     * @property {string} local.driver    The name of the driver used for the DB connection.
     * @property {string} local.user      The username used for the DB connection.
     * @property {string} local.password  The password used for the DB connection.
     * @property {string} local.host      The hostname used for the DB connection.
     * @property {string} local.port      The port used for the DB connection.
     * @property {string} local.database  The name of the database used for the DB connection.
     */
    local: {
      driver: "mysql",
      user: "root",
      password: "",
      host: "localhost",
      port: 3306,
      database: "puzzle_sample"
    },

    /**
     * @property {Object} test           Local instance of the DB connection.
     * @property {string} test.driver    The name of the driver used for the DB connection.
     * @property {string} test.user      The username used for the DB connection.
     * @property {string} test.password  The password used for the DB connection.
     * @property {string} test.host      The hostname used for the DB connection.
     * @property {string} test.port      The port used for the DB connection.
     * @property {string} test.database  The name of the database used for the DB connection.
     */
    test: {
      driver: "mysql",
      user: "root",
      password: "",
      host: "localhost",
      port: 3306,
      database: "puzzle_test"
    },

    /**
     * @property {Object} production           Local instance of the DB connection.
     * @property {string} production.driver    The name of the driver used for the DB connection.
     * @property {string} production.user      The username used for the DB connection.
     * @property {string} production.password  The password used for the DB connection.
     * @property {string} production.host      The hostname used for the DB connection.
     * @property {string} production.port      The port used for the DB connection.
     * @property {string} production.database  The name of the database used for the DB connection.
     */
    production: {
      driver: "mysql",
      user: "root",
      password: "",
      host: "localhost",
      port: 3306,
      database: "puzzle_sample_prod"
    }
  },

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
    languages: ["en", "ro"],

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
   * Socket module configuration.
   *
   * @type {Object}
   */
  socket: {
    /**
     * Enables or disables the socket.io functionality.
     *
     * @type {boolean}
     */
    enabled: false
  },

  /**
   * View/UI module configuration.
   *
   * @type {Object}
   */
  views: {
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
    publicContent: "public"
  }
};
