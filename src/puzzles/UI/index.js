"use strict";

const express = require("express");
const handlebars = require("handlebars");
const hbs = require("express-hbs");
const path = require("path");

const ToggleRuntime = require("../../base/ToggleRuntime");
const URLBuilder = require("../../http/URLBuilder");

/**
 * UI/View engine module.
 *
 * @namespace UI
 */

/**
 * UI/View Engine main entry point.
 *
 * This functionality is disabled by default. To enable it, you must set the
 * puzzle.core.ui attribute in package.json to true.
 *
 * @extends base.ToggleRuntime
 * @memberOf UI
 */
class UIMain extends ToggleRuntime {
  constructor(engine) {
    super(engine, "ui");
    this._enabled = false;
  }

  /**
   * Initializes the UI system.
   */
  init() {
    const config = this.engine.config.views;

    /**
     * Various path lists that are used by the view engine.
     *
     * @protected
     * @member {Object}
     */
    this._paths = {
      views: [
        this._pathResolve(config.views)
      ],
      partials: [
        this._pathResolve(config.partials)
      ]
    };

    /**
     * Reference to handlebars instance.
     *
     * @alias engine.handlebars;
     * @memberOf engine
     * @type {handlebars}
     */
    this.engine.handlebars = handlebars;

    /**
     * View configuration object.
     *
     * Using this object you can add paths to view/partials array.
     *
     * @alias engine.viewConfig;
     * @memberOf engine
     * @type {Object}
     */
    this.engine.viewConfig = {
      view: (viewPath) => {
        this._paths.views.push(this._pathResolve(viewPath));
      },
      partials: (partialPath) => {
        this._paths.partials.push(this._pathResolve(partialPath));
      }
    };
  }

  /**
   * Performs some actions.
   */
  run() {
    const { app, config } = this.engine;

    app.locals.engine = this.engine;
    app.locals.version = this.engine.version.version;
    app.locals.config = this.engine.config;

    app.engine("hbs", hbs.express4({
      partialsDir: this._paths.partials,
      defaultLayout: this._pathResolve(config.views.defaultLayout),
      extname: ".hbs",
      handlebars,
      i18n: this.engine.i18n,
      layoutsDir: this._pathResolve(config.views.layouts),
      beautify: true,
    }));
    app.set("view engine", "hbs");
    app.set("views", this._paths.views);
    app.use(URLBuilder(this.engine, "/"), express.static(this._pathResolve(config.views.publicContent)));
  }

  /**
   * Resolves the path to the given folder path.
   *
   * @protected
   * @param {string} folderPath The path to be resolved.
   *
   * @return {string}
   */
  _pathResolve(folderPath) {
    return path.resolve(folderPath);
  }
}

module.exports = UIMain;
