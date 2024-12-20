// Import all database modules
const userManagement = require('./app/db/user_management');
const appointmentManagement = require('./app/db/appointment_management');
const medicalServices = require('./app/db/medical_services');
const ePharmacy = require('./app/db/e_pharmacy');
const paymentAndBilling = require('./app/db/payment_and_billing');
const teleafyaClinics = require('./app/db/teleafya_clinics');
const chpManagement = require('./app/db/chp_management');

// Function to test all database connections and models
async function testAllDatabases() {
    console.log('🔄 Starting database tests...\n');

    try {
        // Test User Management
        console.log('Testing User Management Database:');
        await userManagement.testConnection();
        console.log('✅ User Management models verified\n');

        // Test Appointment Management
        console.log('Testing Appointment Management Database:');
        await appointmentManagement.testConnection();
        console.log('✅ Appointment Management models verified\n');

        // Test Medical Services
        console.log('Testing Medical Services Database:');
        await medicalServices.testConnection();
        console.log('✅ Medical Services models verified\n');

        // Test E-Pharmacy
        console.log('Testing E-Pharmacy Database:');
        await ePharmacy.testConnection();
        console.log('✅ E-Pharmacy models verified\n');

        // Test Payment and Billing
        console.log('Testing Payment and Billing Database:');
        await paymentAndBilling.testConnection();
        console.log('✅ Payment and Billing models verified\n');

        // Test TeleAfya Clinics
        console.log('Testing TeleAfya Clinics Database:');
        await teleafyaClinics.testConnection();
        console.log('✅ TeleAfya Clinics models verified\n');

        // Test CHP Management
        console.log('Testing CHP Management Database:');
        await chpManagement.testConnection();
        console.log('✅ CHP Management models verified\n');

        console.log('🎉 All database tests completed successfully!');
        
        // Create a test user to verify data insertion
        console.log('\n📝 Creating test data...');
        const testUser = await userManagement.User.create({
            email: 'test@teleafya.com',
            password: 'hashedPassword123',
            first_name: 'Test',
            last_name: 'User',
            phone_number: '+254700000000',
            role: 'admin'
        });
        console.log('✅ Test user created successfully:', testUser.user_id);

    } catch (error) {
        console.error('❌ Error during database tests:', error);
    } finally {
        // Close all database connections
        await Promise.all([
            userManagement.sequelize.close(),
            appointmentManagement.sequelize.close(),
            medicalServices.sequelize.close(),
            ePharmacy.sequelize.close(),
            paymentAndBilling.sequelize.close(),
            teleafyaClinics.sequelize.close(),
            chpManagement.sequelize.close()
        ]);
        console.log('\n👋 Database connections closed');
    }
}

// Run the tests
console.log('🚀 TeleAfya Database Test Script');
console.log('================================\n');
testAllDatabases()
    .then(() => console.log('\n✨ Test script completed'))
    .catch(err => console.error('❌ Fatal error:', err));
