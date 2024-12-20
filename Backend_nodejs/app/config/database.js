const { Sequelize } = require('sequelize');

// Create database connections
const userManagementDb = new Sequelize('user_management', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql'
});

const appointmentManagementDb = new Sequelize('appointment_management', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql'
});

const chpManagementDb = new Sequelize('chp_management', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql'
});

const ePharmacyDb = new Sequelize('e_pharmacy', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql'
});

const medicalServicesDb = new Sequelize('medical_services', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql'
});

const paymentAndBillingDb = new Sequelize('payment_and_billing', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql'
});

const teleafyaClinicsDb = new Sequelize('teleafya_clinics', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test all database connections
async function testConnections() {
  try {
    await userManagementDb.authenticate();
    console.log('User Management Database connected.');

    await appointmentManagementDb.authenticate();
    console.log('Appointment Management Database connected.');

    await chpManagementDb.authenticate();
    console.log('CHP Management Database connected.');

    await ePharmacyDb.authenticate();
    console.log('E-Pharmacy Database connected.');

    await medicalServicesDb.authenticate();
    console.log('Medical Services Database connected.');

    await paymentAndBillingDb.authenticate();
    console.log('Payment and Billing Database connected.');

    await teleafyaClinicsDb.authenticate();
    console.log('TeleAfya Clinics Database connected.');

  } catch (error) {
    console.error('Unable to connect to the databases:', error);
  }
}

module.exports = {
  userManagementDb,
  appointmentManagementDb,
  chpManagementDb,
  ePharmacyDb,
  medicalServicesDb,
  paymentAndBillingDb,
  teleafyaClinicsDb,
  testConnections
};
