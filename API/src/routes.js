// const {Router} = require('express');
import { Router } from 'express';
import multer from 'multer';
import muterConfig from './config/multer';
// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(muterConfig);

// routes.get('/', (req, res) => res.json({ message: 'hello Rocktseat!' }));

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Diego',
//     email: 'deigo@gmail.com',
//     password_hash: '123123'
//   });
//   return res.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
// só pega as rotas que estão a baixo dele
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

// module.exports = routes;
export default routes;
