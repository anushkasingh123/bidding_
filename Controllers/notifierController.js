const Notification = require('../Models/Notification.Model');

exports.getNotifications = async (req, res) => {
  const email = req.user.userinfo.email;
  const userdb = await User.findOne({where: {email:email}});
  const userId=userdb.id;
  try {
    const notifications = await Notification.findAll({ where: { user_id: userId }, order: [['created_at', 'DESC']] });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markNotificationsRead = async (req, res) => {
  const email = req.user.userinfo.email;
  const userdb = await User.findOne({where: {email:email}});
  const userId=userdb.id;
  try {
    await Notification.update({ is_read: true }, { where: { user_id: userId, is_read: false } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};