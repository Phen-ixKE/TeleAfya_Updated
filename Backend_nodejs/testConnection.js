const { Sequelize } = require('sequelize');

// Create connections for each database
const databases = [
    'user_management',
    'appointment_management',
    'chp_management',
    'e_pharmacy',
    'medical_services',
    'payment_and_billing',
    'teleafya_clinics'
];

async function testConnections() {
    for (const dbName of databases) {
        const sequelize = new Sequelize(dbName, 'teleafyabackend', 'teleafyabackend', {
            host: 'localhost',
            dialect: 'mysql'
        });

        try {
            await sequelize.authenticate();
            console.log(`✅ Successfully connected to ${dbName} database`);
        } catch (error) {
            console.error(`❌ Error connecting to ${dbName} database:`, error.message);
        } finally {
            await sequelize.close();
        }
    }
}

console.log('Testing database connections...');
testConnections()
    .then(() => console.log('All connection tests completed'))
    .catch(err => console.error('Error in test process:', err));
