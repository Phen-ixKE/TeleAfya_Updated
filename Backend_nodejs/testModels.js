const { testConnections } = require('./app/config/database');
const { User, testConnection: testUserModel } = require('./app/models/user_models/user_model');
const { Chp, testConnection: testChpModel } = require('./app/models/user_models/chp_model');
const { Appointment, testConnection: testAppointmentModel } = require('./app/models/appointment_model');
const { MedicalService, DoctorSpecialization, testConnection: testMedicalServicesModel } = require('./app/models/medical_services_model');
const { Medication, PharmacyOrder, OrderItem, testConnection: testPharmacyModel } = require('./app/models/pharmacy_model');
const { Payment, Invoice, TransactionHistory, testConnection: testPaymentModel } = require('./app/models/payment_model');
const { Clinic, ClinicStaff, ClinicEquipment, testConnection: testClinicModel } = require('./app/models/clinic_model');

async function testAllModels() {
    try {
        console.log('🔄 Testing database connections...\n');
        await testConnections();

        console.log('\n🔄 Testing User model...');
        await testUserModel();

        console.log('\n🔄 Testing CHP model...');
        await testChpModel();

        console.log('\n🔄 Testing Appointment model...');
        await testAppointmentModel();

        console.log('\n🔄 Testing Medical Services model...');
        await testMedicalServicesModel();

        console.log('\n🔄 Testing Pharmacy model...');
        await testPharmacyModel();

        console.log('\n🔄 Testing Payment model...');
        await testPaymentModel();

        console.log('\n🔄 Testing Clinic model...');
        await testClinicModel();

        // Create test data
        const testUser = await User.create({
            email: 'test@teleafya.com',
            password: 'hashedpassword123',
            first_name: 'Test',
            last_name: 'User',
            phone_number: '+254700000001',
            role: 'admin'
        });
        console.log('\n✅ Test user created:', testUser.user_id);

        const testClinic = await Clinic.create({
            name: 'Test Clinic',
            address: 'Test Address',
            phone_number: '+254700000002',
            email: 'clinic@teleafya.com',
            operating_hours: JSON.stringify({
                monday: '9:00-17:00',
                tuesday: '9:00-17:00',
                wednesday: '9:00-17:00',
                thursday: '9:00-17:00',
                friday: '9:00-17:00'
            }),
            services_offered: 'General Practice, Pediatrics'
        });
        console.log('✅ Test clinic created:', testClinic.clinic_id);

        const testMedication = await Medication.create({
            name: 'Test Medication',
            description: 'Test Description',
            dosage_form: 'tablet',
            strength: '500mg',
            manufacturer: 'Test Manufacturer',
            price: 100.00,
            stock_quantity: 1000,
            requires_prescription: false
        });
        console.log('✅ Test medication created:', testMedication.medication_id);

        console.log('\n🎉 All tests completed successfully!');

    } catch (error) {
        console.error('\n❌ Error during tests:', error);
    }
}

console.log('🚀 TeleAfya Model Tests');
console.log('======================\n');
testAllModels()
    .then(() => console.log('\n✨ Test script completed'))
    .catch(err => console.error('❌ Fatal error:', err));
