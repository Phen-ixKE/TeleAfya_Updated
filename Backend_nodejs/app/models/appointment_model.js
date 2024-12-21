const { DataTypes } = require('sequelize');
const sequelize = require('../db/user_management');

const Appointment = sequelize.define('appointments', {
  appointment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'rescheduled'),
    defaultValue: 'scheduled'
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  },
  meeting_link: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Appointment Model: Database connection established successfully.');
    
    await sequelize.sync({ alter: true });
    console.log('Appointment Model: Table synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  Appointment,
  testConnection
};
