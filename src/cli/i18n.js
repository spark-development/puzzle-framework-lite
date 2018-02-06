"use strict";

const i18n = require("i18n");

/**
 * Internationalisation CLI wrapper.
 *
 * @alias i18n
 * @memberOf cli
 *
 * @param {engine} engine Reference to engine core.
 */
module.exports = (engine) => {
  i18n.configure({
    locales: engine.config.i18n.languages,
    cookie: engine.config.i18n.cookie,
    defaultLocale: engine.config.i18n.defaultLocale,
    directory: `${process.cwd()}/${engine.config.i18n.locales}`,
    autoReload: engine.config.i18n.autoReload,
    updateFiles: engine.config.i18n.updateFiles
  });

  /**
   * Internationalisation object reference.
   *
   * @memberOf engine
   * @type {i18n}
   * @see {@link https://www.npmjs.com/package/i18n}
   */
  engine.i18n = i18n;

  if (engine.cli !== null && engine.cli !== undefined) {
    engine.i18n.setLocale(process.env.PUZZLE_LANG || engine.config.i18n.defaultLocale);
  }
};
