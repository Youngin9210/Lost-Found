const router = require('express').Router();
const { Item, User, Notification } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all items and JOIN with user data
    const itemData = await Item.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'email'],
        },
      ],
    });

    // // Serialize data so the template can read it
    const items = itemData.map((item) => item.get({ plain: true }));

    if (req.session.logged_in) {
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
      const notifications = notificationData.map((n) => n.get({ plain: true }));
      res.render('homepage', {
        items,
        notifications,
        logged_in: req.session.logged_in,
      });
    } else {
      // Pass serialized data and session flag into template
      res.render('homepage', {
        items,
        // notifications,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/item/:id', async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const item = itemData.get({ plain: true });

    if (req.session.logged_in) {
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
      const notifications = notificationData.map((n) => n.get({ plain: true }));
      res.render('item', {
        ...item,
        notifications,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render('item', {
        ...item,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
