const User = require('./User');
const Item = require('./Item');
const Notification = require('./Notification');

User.hasMany(Item, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Notification, {
  foreignKey: 'item_owner',
  onDelete: 'CASCADE',
});

Item.hasOne(Notification, {
  foreignKey: 'item_id',
});

Item.belongsTo(User, {
  foreignKey: 'user_id',
});

Notification.belongsTo(User, {
  foreignKey: 'item_owner',
});

Notification.belongsTo(Item, {
  foreignKey: 'item_id',
});

module.exports = { User, Item, Notification };
