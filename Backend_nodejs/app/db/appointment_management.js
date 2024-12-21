const { Sequelize } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('appointment_management', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // disable logging
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Appointment Management Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

// Export the sequelize instance
module.exports = sequelize;
