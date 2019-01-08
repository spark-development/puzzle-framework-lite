"use strict";

module.exports = {
  modules: {},
  set(moduleName, moduleInstance) {
    this.modules[moduleName] = moduleInstance;
  },
  log: {
    error() {

    }
  },
  http: {
    middleware: false,
    req: {
      pathname: "/",
      url: "/",
      originalUrl: "/",
      origin: [],
      headers: {
        cookies: "expires=Mon, 1 Jan 1969 00:00:00 -0000; HttpOnly",
        store: ""
      },
      store: {

      }
    },
    res: {
      headers: {},
      response: {},
      statusCode: 200,
      setHeader(header, value) {
        this.headers[header] = value;
        return this;
      },
      json(message) {
        this.response = message;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      __(...messages) {
        return messages.join(" ");
      }
    },
    use(fn) {
      fn(this.req, this.res, () => {
        this.middleware = true;
      });
    }
  },
  config: {
    http: {
      cors: "*",
    },
    session: {
      store: "memory",
      key: "test",
      secret: "secret.discret"
    },
    i18n: {
      languages: ["en", "ro"],
      cookie: "puzzle.i18n",
      defaultLocale: "en",
      locales: "locales"
    }
  }
};
