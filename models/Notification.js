const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // is_read: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    //   allowNull: false,
    // },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Item',
        key: 'id',
      },
    },
    item_owner: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Item',
        key: 'user_id',
      },
    },
    found_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'notification',
  }
);

module.exports = Notification;
