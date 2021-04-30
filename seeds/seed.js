const sequelize = require('../config/connection');

const { User, Item } = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const items = await Item.bulkCreate(itemData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();