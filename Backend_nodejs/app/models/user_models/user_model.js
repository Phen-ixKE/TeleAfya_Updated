const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management');

const User = sequelize.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email address already in use'
    },
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'doctor', 'patient', 'pharmacy', 'chp'),
    defaultValue: 'patient'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('User Model: Database connection established successfully.');
    
    await sequelize.sync({ alter: true });
    console.log('User Model: Table synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  User,
  testConnection
};
