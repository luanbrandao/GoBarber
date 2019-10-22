// const express = require('express');
// const routes = require('./routes')
import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

// yarn add express
// yarn add sucrase nodemon -D
// yarn add bcryptjs
// yarn add jsonwebtoken
// yarn add yup, validação

// envio de arquivos
// yarn add  multer

// yarn add date-fns@next

// docker run --name mongobarber -p 27017:27017 -d -t mongo
// yarn add mongoose

// envio de email
// yarn add nodemailer
// tamplate pro email
// yarn  add express-handlebars nodemailer-express-handlebars

// docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
// yarn add bee-queue

// Tratamento de exceções
// yarn add @sentry/node@5.7.1
// yarn add express-async-errors
// faz uma tratativa das msg de erros
// yarn add youch
import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exeptionHandler();
  }

  middlewares() {
    // The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    // The error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exeptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}

// module.exports = new App().server;
export default new App().server;
