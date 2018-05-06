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
  locales: "locales",

  /**
   * i18n - watch for changes in json files to reload locale on updates - defaults to false
   *
   * @var {boolean}
   */
  autoReload: true,

  /**
   * whether to write new locale information to disk - defaults to true
   *
   * @var {boolean}
   */
  updateFiles: false
};
