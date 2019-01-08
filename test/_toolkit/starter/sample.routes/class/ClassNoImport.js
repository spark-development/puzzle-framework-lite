"use strict";

class ClassRoute {
  constructor() {
    this.noImport = true;
  }

  build() {
    puzzle.class_route_no_import = true;
  }
}

module.exports = ClassRoute;
