"use strict";

const express = require("express");
const handlebars = require("handlebars");
const hbs = require("express-hbs");
const path = require("path");

const PRuntime = require("../core/PRuntime");
const URLBuilder = require("../http/URLBuilder");

/**
 * UI/View engine module.
 *
 * @namespace ui
 */

/**
 * UI/View Engine main entry point.
 *
 * This functionality is disabled by default. To enable it, you must set the
 * puzzle.core.ui attribute in package.json to true.
 *
 * @extends core.PRuntime
 * @memberOf UI
 */
class UIMain extends PRuntime {
  /**
   * Link the View engine to the application engine.
   *
   * @param {PEngine} engine The engine reference.
   */
  use(engine) {
    if (puzzle.config.views.enabled) {
      this.init(engine);
      puzzle.modules.register("views", this);
    }
  }

  /**
   * Initializes the ui system.
   *
   * @param {PEngine} engine The engine reference.
   */
  init(engine) {
    const config = engine.config.views;
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
     * @alias puzzle.handlebars;
     * @type {handlebars}
     */
    engine.set("handlebars", handlebars);

    /**
     * View configuration object.
     *
     * Using this object you can add paths to view/partials array.
     *
     * @alias puzzle.viewConfig;
     * @type {Object}
     */
    puzzle.set("viewConfig", {
      view: (viewPath) => {
        this._paths.views.push(this._pathResolve(viewPath));
      },
      partials: (partialPath) => {
        this._paths.partials.push(this._pathResolve(partialPath));
      }
    });
  }

  /**
   * Performs some actions.
   */
  online() {
    if (!puzzle.config.views.enabled) {
      return;
    }
    const { http, config } = puzzle;

    http.locals.engine = puzzle;
    http.locals.version = puzzle.version.version;
    http.locals.config = puzzle.config;

    http.engine("hbs", hbs.express4({
      partialsDir: this._paths.partials,
      defaultLayout: this._pathResolve(config.views.defaultLayout),
      extname: ".hbs",
      handlebars,
      // i18n: puzzle.i18n,
      layoutsDir: this._pathResolve(config.views.layouts),
      beautify: true,
    }));
    http.set("view engine", "hbs");
    http.set("views", this._paths.views);
    http.use(URLBuilder("/"), express.static(this._pathResolve(config.views.publicContent)));
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
