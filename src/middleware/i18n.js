"use strict";

const path = require("path");
const format = require("string-format");

const PUse = require("../core/PUse");

/**
 * Basic internationalization class.
 *
 * @memberOf middleware
 * @extends core.PUse
 * @alias puzzle.i18n
 */
class i18n extends PUse {
  /**
   * Initializes the internationalization object.
   *
   * @param {PEngine} engine The engine reference.
   */
  use(engine) {
    engine.set("i18n", this);

    this.config = engine.config.i18n;
    this.init();
  }

  /**
   * Translation method. Takes the message label key and a bunch of parameters and
   * builds the final message with them.
   *
   * @param {string} labelKey The Label Key.
   * @param {...*} ...params The Parameters to be passed to the message.
   *
   * @return {string}
   */
  __(labelKey, ...params) {
    return format(this._data[this._locale][labelKey] || labelKey, ...params);
  }

  /**
   * Translation method. Takes the message label key and a bunch of parameters and
   * builds the final message with them.
   *
   * @param {string} labelKey The Label Key.
   * @param {...*} ...params The Parameters to be passed to the message.
   *
   * @return {string}
   */
  __n(labelKey, ...params) {
    return this.__(labelKey, ...params);
  }

  /**
   * Performs some initializations.
   */
  init() {
    this._supportedLanguages = this.config.languages;
    this._data = {};
    this._supportedLanguages.forEach((language) => {
      this._data[language] = require(path.join(process.cwd(), this.config.locales, `${language}.json`));
    });
    this._locale = this.config.defaultLocale;

    if (puzzle.http) {
      this.httpI18N();
    } else {
      this.cliI18N();
    }
  }

  /**
   * Method that handles the http i18n.
   */
  httpI18N() {
    puzzle.http.use((req, res, next) => {
      const locale = this.isValid(req.cookies) ?
        req.cookies[this.config.cookie] :
        this.config.defaultLocale;

      this._locale = this._supportedLanguages.indexOf(locale) >= 0 ? locale : this.config.defaultLocale;
      res.__ = (labelKey, ...params) => this.__(labelKey, ...params);
      next();
    });
  }

  /**
   * Method that handles the cli i18n.
   */
  cliI18N() {
    let locale = this.config.defaultLocale;
    if (this.isValid(process.env.PUZZLE_LANG)) {
      locale = process.env.PUZZLE_LANG;
    } else if (this.isValid(process.env.PLANG)) {
      locale = process.env.PLANG;
    }

    this._locale = this._supportedLanguages.indexOf(locale) >= 0 ? locale : this.config.defaultLocale;
  }
}

module.exports = i18n;
