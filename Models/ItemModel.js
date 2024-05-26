const { DataTypes } = require('sequelize');
const {sequelize,connectDB} = require('../Utils/db');
const User = require('../Models/UserModel')

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  starting_price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  current_price: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  /*image_url: {
    type: DataTypes.STRING
  },*/
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }},
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = Item;