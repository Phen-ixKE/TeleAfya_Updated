const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management'); 

const BlacklistedToken = sequelize.define('blacklisted_tokens', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.TEXT, 
    allowNull: false, 
    defaultValue: '[]'
  },
  invalidatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {});

module.exports = BlacklistedToken;
