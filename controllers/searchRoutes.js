const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');

//search route
router.get('/', async (req, res) => {
    console.log('/');
    try {
      // Get all items and JOIN with user data
      const itemData = await Item.findAll({
        // where: { name: "Silver Watch" },
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

  // router.post('/', async (req, res))

  router.post('/', async (req, res) => {
    try {
      const itemName = await Item.findAll({ where: { name: req.body.search } });
  
      if (!itemName) {
        res
          .status(400)
          .json({ message: 'Cannot find item with this name' });
        return;
      }
  
      // const validPassword = await userData.checkPassword(req.body.password);
  
      // if (!validPassword) {
      //   res
      //     .status(400)
      //     .json({ message: 'Incorrect email or password, please try again' });
      //   return;
      // }
  
      // req.session.save(() => {
      //   req.session.user_id = userData.id;
      //   req.session.logged_in = true;
  
      //   res.json({ user: userData, message: 'You are now logged in!' });
      // });
      
    } catch (err) {
      res.status(400).json(err.message);
    }
  });

module.exports = router;