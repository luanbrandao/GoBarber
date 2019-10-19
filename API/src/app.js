// const express = require('express');
// const routes = require('./routes')
import express from 'express';
import path from 'path';
import routes from './routes';

// yarn add express
// yarn add sucrase nodemon -D
// yarn add bcryptjs
// yarn add jsonwebtoken
// yarn add yup, validação

// envio de arquivos
// yarn add  multer

// yarn add date-fns@next
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

// module.exports = new App().server;
export default new App().server;
