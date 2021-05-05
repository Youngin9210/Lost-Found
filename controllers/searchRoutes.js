const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');

//search route
router.get('/', async (req, res) => {
    console.log('/');
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
      // Pass serialized data and session flag into template
      res.render('search', { items, logged_in: req.session.logged_in });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

module.exports = router;