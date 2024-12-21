const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management');

const Chp = sequelize.define('chps', {
  chp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
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
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
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
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('CHP Model: Database connection established successfully.');
    
    // Sync the model with the database
    await sequelize.sync({ alter: true });
    console.log('CHP Model: Table synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  Chp,
  testConnection
};
