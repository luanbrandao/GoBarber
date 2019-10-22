import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvaliableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    // 2018-06-23 17:59:33
    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
        }
      }
    });

    const schedule = [
      '08:00', // 2018-06-23 08:00:00
      '09:00', // 2018-06-23 09:00:00
      '10:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00'
    ];

    const avaiable = schedule.map(time => {
      // ver se o horário já não passou
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        // formata a data nesse formato // 2018-06-23 09:00:00
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        avaliable:
          // vefirica se o horario e depois de agora
          isAfter(value, new Date()) &&
          // verifica se o horario ainda não foi reservado
          !appointments.find(a => format(a.date, 'HH:mm') === time)
      };
    });

    return res.json(avaiable);
  }
}
export default new AvaliableController();
