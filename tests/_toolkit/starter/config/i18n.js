/**
 * i18n configuration file.
 */

"use strict";

/** i18n configuration. */
module.exports = {
  /**
   * A list with all enabled languages.
   *
   * @type {string[]}
   */
  languages: ['en', 'ro'],

  /**
   * The name of the cookie used to translate the application.
   *
   * @type {string}
   */
  cookie: 'puzzle.i18n',

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
};
