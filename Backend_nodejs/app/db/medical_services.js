const { Sequelize, DataTypes } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('medical_services', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Medical Service Model
const MedicalService = sequelize.define('MedicalService', {
  service_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  duration_minutes: {
    type: DataTypes.INTEGER
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  department: {
    type: DataTypes.STRING(100)
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Define Doctor Specialization Model
const DoctorSpecialization = sequelize.define('DoctorSpecialization', {
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
    type: DataTypes.STRING(100),
    allowNull: false
  },
  certification: {
    type: DataTypes.STRING(255)
  },
  years_experience: {
    type: DataTypes.INTEGER
  }
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Medical Services database connection established successfully.');
    
    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('Medical Services tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the models and connection
module.exports = {
  sequelize,
  MedicalService,
  DoctorSpecialization,
  testConnection
};
