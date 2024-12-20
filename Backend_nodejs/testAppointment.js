const { testConnection } = require('./app/db/appointment_management');

console.log('Testing Appointment Management setup...');
testConnection()
    .then(() => console.log('Test completed'))
    .catch(err => console.error('Test failed:', err));
