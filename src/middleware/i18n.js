"use strict";

/** global: puzzle */

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

    /**
     * i18n configuration object.
     *
     * @property {Object}
     */
    this.config = engine.config.i18n;
    this.init();
  }

  /**
   * Performs some initializations.
   */
  init() {
    /**
     * A list of supported languages that can be used in the application.
     *
     * @protected
     * @property {Array}
     */
    this._supportedLanguages = this.config.languages;
    /**
     * The data used to translate messages.
     *
     * @protected
     * @property {Object}
     */
    this._data = {};
    this._supportedLanguages.forEach((language) => {
      this._data[language] = require(path.join(process.cwd(), this.config.locales, `${language}.json`));
    });
    /**
     * The current language used by the application.
     *
     * @protected
     * @property {string}
     */
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
      const locale = this.isValid(req.cookies)
        ? req.cookies[this.config.cookie]
        : this.config.defaultLocale;

      this._locale = this._supportedLanguages.indexOf(locale) >= 0 ? locale : this.config.defaultLocale;

      /**
       * Returns a translated message to be used in various situations.
       *
       * @memberOf {http.ServerResponse}
       *
       * @param {string} labelKey The Label Key.
       * @param {...*} params The Parameters to be passed to the message.
       *
       * @return {string}
       */
      res.__ = (labelKey, ...params) => this.__(labelKey, ...params);

      /**
       * Returns an error to the API.
       *
       * @memberOf {http.ServerResponse}
       *
       * @param {string} labelKey The Label Key.
       * @param {...*} params The Parameters to be passed to the message.
       *
       * @return {http.ServerResponse}
       */
      res.__ok = (labelKey, ...params) => res.ok(this.__(labelKey, ...params));
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

  /**
   * Translation method. Takes the message label key and a bunch of parameters and
   * builds the final message with them.
   *
   * @param {string} labelKey The Label Key.
   * @param {...*} params The Parameters to be passed to the message.
   *
   * @return {string}
   */
  __(labelKey, ...params) {
    return format(this._extractLabelKey(labelKey), ...params);
  }

  /**
   * Translation method. Takes the message label key and a bunch of parameters and
   * builds the final message with them.
   *
   * @param {string} labelKey The Label Key.
   * @param {...*} params The Parameters to be passed to the message.
   *
   * @return {string}
   */
  __n(labelKey, ...params) {
    return this.__(labelKey, ...params);
  }

  /**
   * Method used to extract the correct label, in order to
   * translate a message on the screen.
   *
   * @protected
   *
   * @param {*} labelKey The key to be converted.
   *
   * @return {string}
   */
  _extractLabelKey(labelKey) {
    if (labelKey instanceof Error) {
      return labelKey.message;
    }

    if (typeof labelKey !== "string") {
      return labelKey.constructor.name;
    }

    let locale = this._data[this._locale];
    if (labelKey.indexOf(".") < 0) {
      return locale[labelKey] || labelKey;
    }

    if (this.isValid(locale[labelKey])) {
      return locale[labelKey];
    }

    const labelTree = labelKey.split(".");
    for (const treeElement of labelTree) {
      if (!this.isValid(locale[treeElement])) {
        return labelKey;
      }

      locale = locale[treeElement];
    }
    return locale || labelKey;
  }
}

module.exports = i18n;
