const router = require('express').Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const notificationRoutes = require('./notificationRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
