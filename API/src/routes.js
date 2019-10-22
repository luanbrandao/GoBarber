// const {Router} = require('express');
import { Router } from 'express';
import multer from 'multer';
import muterConfig from './config/multer';
// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';
import AvailableController from './app/controllers/AvailableController';

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

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// module.exports = routes;
export default routes;
