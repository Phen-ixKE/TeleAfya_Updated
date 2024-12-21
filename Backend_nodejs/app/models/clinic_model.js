const { DataTypes } = require('sequelize');
const sequelize = require('../db/user_management');

const Clinic = sequelize.define('clinics', {
  clinic_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  operating_hours: {
    type: DataTypes.JSON,
    allowNull: false
  },
  services_offered: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

const ClinicStaff = sequelize.define('clinic_staff', {
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
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'on_leave'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

const ClinicEquipment = sequelize.define('clinic_equipment', {
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
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  purchase_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  maintenance_schedule: {
    type: DataTypes.JSON,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('operational', 'maintenance', 'retired'),
    defaultValue: 'operational'
  }
}, {
  timestamps: true
});

// Set up associations
Clinic.hasMany(ClinicStaff, { foreignKey: 'clinic_id' });
ClinicStaff.belongsTo(Clinic, { foreignKey: 'clinic_id' });
Clinic.hasMany(ClinicEquipment, { foreignKey: 'clinic_id' });
ClinicEquipment.belongsTo(Clinic, { foreignKey: 'clinic_id' });

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Clinic Model: Database connection established successfully.');
    
    await sequelize.sync({ alter: true });
    console.log('Clinic Model: Tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  Clinic,
  ClinicStaff,
  ClinicEquipment,
  testConnection
};
