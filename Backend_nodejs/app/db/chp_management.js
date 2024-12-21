const { Sequelize } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('chp_management', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // disable logging
});

// Define Community Health Provider Model
const CommunityHealthProvider = sequelize.define('CommunityHealthProvider', {
  chp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  certification_number: {
    type: DataTypes.STRING(50),
    unique: true
  },
  area_of_operation: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  experience_years: {
    type: DataTypes.INTEGER
  },
  specializations: {
    type: DataTypes.JSON // Array of specializations
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'inactive'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Define Community Health Visit Model
const CommunityHealthVisit = sequelize.define('CommunityHealthVisit', {
  visit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chp_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  visit_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  purpose: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  findings: {
    type: DataTypes.TEXT
  },
  recommendations: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Define Health Education Session Model
const HealthEducationSession = sequelize.define('HealthEducationSession', {
  session_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chp_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  topic: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  session_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  target_audience: {
    type: DataTypes.STRING(100)
  },
  attendees_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('planned', 'completed', 'cancelled'),
    defaultValue: 'planned'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Set up associations
CommunityHealthProvider.hasMany(CommunityHealthVisit, { foreignKey: 'chp_id' });
CommunityHealthVisit.belongsTo(CommunityHealthProvider, { foreignKey: 'chp_id' });
CommunityHealthProvider.hasMany(HealthEducationSession, { foreignKey: 'chp_id' });
HealthEducationSession.belongsTo(CommunityHealthProvider, { foreignKey: 'chp_id' });

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('CHP Management Database connection has been established successfully.');
    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('CHP Management tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

// Export the sequelize instance
module.exports = {
  sequelize,
  CommunityHealthProvider,
  CommunityHealthVisit,
  HealthEducationSession,
  testConnection
};
