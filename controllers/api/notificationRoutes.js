const router = require('express').Router();
const { Notification } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newNotification = await Notification.create({
      item_id: req.body.id,
      item_owner: req.body.item_owner,
      found_user: req.body.found_user,
    });

    res.status(200).json(newNotification);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
