import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    // if (!isProvider) {
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only prodiver can load notifications' });
    }

    // busca no mongo
    const notifications = await Notification.find({
      user: req.userId
    })
      // .sort('createAt')
      .sort({ createAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);
    // encontra e atualiza o elemento ao mesmo tempo
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      // retorna a notificação atualizada
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
