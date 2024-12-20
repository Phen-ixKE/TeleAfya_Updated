const { Sequelize, DataTypes } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('teleafya_clinics', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Clinic Model
const Clinic = sequelize.define('Clinic', {
  clinic_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    validate: {
      isEmail: true
    }
  },
  operating_hours: {
    type: DataTypes.JSON // Store as JSON: {monday: "9:00-17:00", tuesday: "9:00-17:00", etc.}
  },
  services_offered: {
    type: DataTypes.TEXT
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Define Clinic Staff Model
const ClinicStaff = sequelize.define('ClinicStaff', {
  staff_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('doctor', 'nurse', 'receptionist', 'admin'),
    allowNull: false
  },
  schedule: {
    type: DataTypes.JSON // Store work schedule as JSON
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Define Clinic Equipment Model
const ClinicEquipment = sequelize.define('ClinicEquipment', {
  equipment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('available', 'in_use', 'maintenance', 'out_of_order'),
    defaultValue: 'available'
  },
  last_maintenance: {
    type: DataTypes.DATE
  },
  next_maintenance: {
    type: DataTypes.DATE
  }
});

// Set up associations
Clinic.hasMany(ClinicStaff, { foreignKey: 'clinic_id' });
ClinicStaff.belongsTo(Clinic, { foreignKey: 'clinic_id' });
Clinic.hasMany(ClinicEquipment, { foreignKey: 'clinic_id' });
ClinicEquipment.belongsTo(Clinic, { foreignKey: 'clinic_id' });

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('TeleAfya Clinics database connection established successfully.');
    
    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('TeleAfya Clinics tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the models and connection
module.exports = {
  sequelize,
  Clinic,
  ClinicStaff,
  ClinicEquipment,
  testConnection
};
