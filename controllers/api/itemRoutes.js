const router = require('express').Router();
const { Item, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
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
    const user = req.session.user_id;

    res.render('singleItem', { item, user, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/isFound/:id', async (req, res) => {
  try {
    const itemData = await Item.update(
      {
        isFound: req.body.isFound,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(itemData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newItem = await Item.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No item found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
