"use strict";

const i18n = require("i18n");

/**
 * Internationalisation wrapper.
 *
 * @alias i18n
 * @memberOf middleware
 *
 * @param {engine} engine Reference to engine core.
 */
module.exports = (engine) => {
  const { app, config } = engine;

  i18n.configure({
    locales: config.i18n.languages,
    cookie: config.i18n.cookie,
    defaultLocale: config.i18n.defaultLocale,
    directory: `${process.cwd()}/${config.i18n.locales}`
  });

  app.use(i18n.init);
};
