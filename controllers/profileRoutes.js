const router = require('express').Router();
const { User, Item, Notification } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log('/');
  try {
    // Get all items and JOIN with user data
    const itemData = await Item.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Item }],
    });

    const notificationData = await Notification.findAll({
      where: {
        item_owner: req.session.user_id,
      },
      include: [
        {
          model: Item,
          attributes: ['name'],
        },
      ],
    });

    // // Serialize data so the template can read it
    const items = itemData.map((item) => item.get({ plain: true }));
    const user = userData.get({ plain: true });
    const notifications = notificationData.map((n) => n.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('profile', {
      items,
      ...user,
      notifications,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put('/update/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Item.update(
      {
        name: req.body.name,
        description: req.body.description,
        reward: req.body.reward,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(itemData);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
