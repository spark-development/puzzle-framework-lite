"use strict";

const fs = require("fs");
const path = require("path");
const _ = require("lodash");

/**
 * This is the module description.
 *
 * @namespace puzzles
 */

/**
 * Adds the toggle runtimes into the application.
 *
 * @alias puzzles.puzzles
 * @memberOf puzzles
 */
module.exports = (puzzleInstance) => {
  const modules = fs.readdirSync(__dirname, "UTF-8");
  _.each(modules, (module) => {
    if (module === "index.js") {
      return;
    }

    if (fs.existsSync(path.join(__dirname, module, "index.js"))) {
      puzzleInstance.pushRuntime(require(path.join(__dirname, module)));
    } else if (fs.existsSync(path.join(__dirname, module, `${module}.js`))) {
      puzzleInstance.pushRuntime(require(path.join(__dirname, module, `${module}.js`)));
    }
  });
};
