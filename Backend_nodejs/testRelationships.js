// Import all database modules
const userManagement = require('./app/db/user_management');
const appointmentManagement = require('./app/db/appointment_management');
const medicalServices = require('./app/db/medical_services');
const ePharmacy = require('./app/db/e_pharmacy');
const paymentAndBilling = require('./app/db/payment_and_billing');

async function testDatabaseRelationships() {
    console.log('🔄 Testing database relationships...\n');

    try {
        // Create a test user (doctor)
        const doctor = await userManagement.User.create({
            email: 'doctor@teleafya.com',
            password: 'hashedPassword123',
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '+254711111111',
            role: 'doctor'
        });
        console.log('✅ Doctor created:', doctor.user_id);

        // Create a test user (patient)
        const patient = await userManagement.User.create({
            email: 'patient@teleafya.com',
            password: 'hashedPassword123',
            first_name: 'Jane',
            last_name: 'Smith',
            phone_number: '+254722222222',
            role: 'patient'
        });
        console.log('✅ Patient created:', patient.user_id);

        // Create an appointment
        const appointment = await appointmentManagement.Appointment.create({
            patient_id: patient.user_id,
            doctor_id: doctor.user_id,
            appointment_date: new Date(),
            reason: 'Regular checkup',
            status: 'scheduled'
        });
        console.log('✅ Appointment created:', appointment.appointment_id);

        // Create a payment for the appointment
        const payment = await paymentAndBilling.Payment.create({
            user_id: patient.user_id,
            amount: 1000.00,
            payment_method: 'mpesa',
            transaction_ref: 'TEST' + Date.now(),
            status: 'completed',
            service_type: 'appointment',
            service_id: appointment.appointment_id
        });
        console.log('✅ Payment created:', payment.payment_id);

        // Create an invoice
        const invoice = await paymentAndBilling.Invoice.create({
            payment_id: payment.payment_id,
            user_id: patient.user_id,
            invoice_number: 'INV' + Date.now(),
            amount: 1000.00,
            status: 'paid',
            description: 'Appointment payment'
        });
        console.log('✅ Invoice created:', invoice.invoice_id);

        // Create a medication
        const medication = await ePharmacy.Medication.create({
            name: 'Test Medicine',
            dosage_form: 'tablet',
            strength: '500mg',
            price: 50.00,
            stock_quantity: 100,
            requires_prescription: true
        });
        console.log('✅ Medication created:', medication.medication_id);

        console.log('\n✅ All test relationships created successfully!');

    } catch (error) {
        console.error('❌ Error testing relationships:', error);
    } finally {
        // Close all database connections
        await Promise.all([
            userManagement.sequelize.close(),
            appointmentManagement.sequelize.close(),
            medicalServices.sequelize.close(),
            ePharmacy.sequelize.close(),
            paymentAndBilling.sequelize.close()
        ]);
        console.log('\n👋 Database connections closed');
    }
}

// Run the tests
console.log('🚀 TeleAfya Relationship Test Script');
console.log('===================================\n');
testDatabaseRelationships()
    .then(() => console.log('\n✨ Relationship tests completed'))
    .catch(err => console.error('❌ Fatal error:', err));
