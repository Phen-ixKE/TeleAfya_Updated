const { DataTypes } = require('sequelize');
const { medicalServicesDb } = require('../config/database');

const MedicalService = medicalServicesDb.define('medical_services', {
  service_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

const DoctorSpecialization = medicalServicesDb.define('doctor_specializations', {
  specialization_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  certification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  years_experience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

async function testConnection() {
  try {
    await medicalServicesDb.authenticate();
    console.log('Medical Services Model: Database connection established successfully.');
    
    await medicalServicesDb.sync({ alter: true });
    console.log('Medical Services Model: Tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  MedicalService,
  DoctorSpecialization,
  testConnection
};
