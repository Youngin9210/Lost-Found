const router = require('express').Router();
const { User, Item } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    console.log('/');
    try {
      // Get all items and JOIN with user data
      const itemData = await Item.findAll({
        where: {user_id: req.session.user_id},
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // // Serialize data so the template can read it
      const items = itemData.map((item) => item.get({ plain: true }));

      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Item }],
      });
  
      const user = userData.get({ plain: true });


      // Pass serialized data and session flag into template
      res.render('profile', { items, ...user, logged_in: req.session.logged_in });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  module.exports = router;