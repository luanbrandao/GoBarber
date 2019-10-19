import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    // 2019-11-22 00:00:00
    // 2019-11-22 23:59:00

    const { date } = req.query;
    const parserDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          // pega os agendamentos que então entra as datas
          [Op.between]: [startOfDay(parserDate), endOfDay(parserDate)]
        }
      },
      order: ['date']
    });
    return res.json(appointments);
  }
}

export default new ScheduleController();
