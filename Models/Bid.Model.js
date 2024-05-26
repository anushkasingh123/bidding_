const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');
const User = require('./User');
const Item = require('./Item');

const Bid = sequelize.define('Bid', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  bid_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  created_at: {
    type: timestamps,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = Bid;