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
}

export default new NotificationController();
